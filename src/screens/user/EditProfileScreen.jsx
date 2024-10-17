import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios' // Thêm axios để gửi request
import React, { useState } from 'react'
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import * as ImagePicker from 'react-native-image-picker' // Import thư viện
import { defaultStyles } from '../../styles/index'

const EditProfileScreen = () => {
	const route = useRoute() // Get params from navigation
	const navigation = useNavigation() // To navigate back
	const [name, setName] = useState(route.params.name)
	const [email, setEmail] = useState(route.params.email)
	const [language, setLanguage] = useState(route.params.language)
	const [avatar, setAvatar] = useState(route.params.avatar ? String(route.params.avatar) : null)

	// Hàm chọn ảnh từ thư viện
	const chooseImage = () => {
		let options = {
			mediaType: 'photo',
			quality: 1,
		}
		ImagePicker.launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker')
			} else if (response.errorMessage) {
				console.log('ImagePicker Error: ', response.errorMessage)
			} else if (response.assets && response.assets.length > 0) {
				const selectedImage = response.assets[0]
				setAvatar(selectedImage.uri) // update uri image
				uploadImage(selectedImage) // Upload image
			}
		})
	}

	//  upload image to server
	const uploadImage = async (image) => {
		const formData = new FormData()
		formData.append('file', {
			uri: image.uri,
			name: image.fileName || 'avatar.jpg',
			type: image.type || 'image/jpeg',
		})

		try {
			const response = await axios.post('https://test-profile-mma.onrender.com/uploads', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			console.log('Upload thành công: ', response.data)
			setAvatar(`https://test-profile-mma.onrender.com/${response.data.filePath}`) // update URL new image  from server
		} catch (error) {
			console.log('Lỗi upload: ', error)
		}
	}

	//  submit data
	const handleSubmit = () => {
		navigation.navigate('User', {
			updatedName: name,
			updatedEmail: email,
			updatedLanguage: language,
			updatedAvatar: avatar,
		})
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						// source={avatar ? { uri: avatar } : require('../../../assets/unknown_artist.png')}
						source={avatar}
					/>
					<TouchableOpacity style={styles.changeAvatarButton} onPress={chooseImage}>
						<Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.form}>
					<Text style={styles.label}>Name</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter Name"
						value={name}
						onChangeText={setName}
						placeholderTextColor="#aaa"
					/>
					<Text style={styles.label}>Email</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter Email"
						value={email}
						onChangeText={setEmail}
						placeholderTextColor="#aaa"
					/>
					<Text style={styles.label}>Language</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter Language"
						value={language}
						onChangeText={setLanguage}
						placeholderTextColor="#aaa"
					/>
					<TouchableOpacity style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	form: {
		width: '80%',
	},
	label: {
		marginTop: 20,
		color: '#fff', // White text for labels
		fontSize: 16,
		fontWeight: 'bold',
	},
	input: {
		borderColor: '#555', // Dark gray border
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		fontSize: 18,
		color: '#fff', // White text for inputs
		backgroundColor: '#222', // Dark background for input fields
		marginBottom: 10,
	},
	button: {
		marginTop: 20,
		backgroundColor: '#1E90FF', // Blue button color
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center',
	},
	avatarContainer: {
		marginTop: 20,
		alignItems: 'center',
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 10,
	},
	changeAvatarButton: {
		marginTop: 10,
	},
	changeAvatarButtonText: {
		color: '#1E90FF', // Blue color for the Change Avatar text
		fontSize: 18,
	},
})

export default EditProfileScreen
