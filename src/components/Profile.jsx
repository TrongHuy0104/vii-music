// import React, { useState } from 'react'
// // import { StyleSheet, View } from 'react-native'
// import { defaultStyles } from '../styles/index'

// import { useNavigation } from '@react-navigation/native'
// import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'

// import unknowImage from '../../assets/unknown_artist.png'

// export default function Profile() {
// 	const navigation = useNavigation()

// 	const [name, setName] = useState('Vikashini Vinie') // Tên người dùng hiện tại
// 	const [email, setEmail] = useState('vikashini@example.com') // Email người dùng hiện tại
// 	const [language, setLanguage] = useState('English') // Ngôn ngữ người dùng hiện tại

// 	const navigateToEdit = () => {
// 		// navigation.navigate('EditProfileScreen', { name, email, language })
// 		navigation.navigate('user', {
// 			screen: 'EditProfileScreen',
// 			params: { name, email, language },
// 		})
// 	}

// 	return (
// 		<View style={defaultStyles.container}>
// 			<ScrollView contentContainerStyle={styles.container}>
// 				{/* Profile Image and Name */}
// 				<View style={styles.profileSection}>
// 					<Image
// 						source={unknowImage} // Replace with your profile image link
// 						style={styles.profileImage}
// 					/>
// 					<Text style={styles.profileName}>{name}</Text>
// 				</View>
// 				<Button
// 					title="Edit"
// 					onPress={() => navigation.navigate('EditProfileScreen', { name, email, language })} // Điều hướng tới trang EditProfileScreen
// 				/>

// 				<Text style={styles.sectionHeader}>Personal Information</Text>
// 				<View style={styles.content}>
// 					<Text style={styles.infoText}>{name} </Text>
// 					<Text style={styles.infoText}>abv@gmail.com</Text>
// 					<Text style={styles.infoText}>English</Text>
// 				</View>

// 				{/* About Section
// 				<View style={styles.infoSection}>
// 					<Text style={styles.sectionHeader}>About</Text>
// 					<View style={styles.content}>
// 						<Text style={styles.infoText}>Privacy</Text>
// 						<Text style={styles.infoText}>Storage</Text>
// 						<Text style={styles.infoText}>Audio Quality</Text>
// 					</View>
// 				</View> */}
// 			</ScrollView>
// 		</View>
// 	)
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flexGrow: 1,
// 		padding: 20,
// 	},
// 	profileSection: {
// 		alignItems: 'center',
// 		marginBottom: 50,
// 	},
// 	profileImage: {
// 		width: 100,
// 		height: 100,
// 		borderRadius: 50,
// 		marginBottom: 20,
// 	},
// 	profileName: {
// 		color: '#fff', // White text for name
// 		fontSize: 25,
// 		fontWeight: 'bold',
// 	},
// 	infoSection: {
// 		marginBottom: 100,
// 	},
// 	sectionHeader: {
// 		color: '#fff', // White header
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		marginBottom: 15,
// 		paddingBottom: 10,
// 		paddingTop: 20,
// 	},
// 	infoText: {
// 		color: '#fff', // White text for list items
// 		fontSize: 18,
// 		padding: 10,
// 		borderBottomColor: '#555',
// 		borderBottomWidth: 1,
// 		paddingVertical: 15,
// 	},
// 	content: {
// 		paddingBottom: 30,
// 	},
// })

import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native' // Thêm useRoute để nhận tham số
import React, { useEffect, useState } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { defaultStyles } from '../styles/index'

import unknowImage from '../../assets/unknown_artist.png'

export default function Profile() {
	const navigation = useNavigation()
	const isFocused = useIsFocused() // Check if the screen is focused
	const route = useRoute() // Lấy params từ navigation

	// Default user information
	const [name, setName] = useState('Vikashini Vini')
	const [email, setEmail] = useState('vikashini@example.com')
	const [language, setLanguage] = useState('English')
	const [avatar, setAvatar] = useState(unknowImage)

	// Update user information when coming back to the Profile screen
	useEffect(() => {
		if (isFocused && route.params) {
			// Kiểm tra nếu có params được truyền từ EditProfileScreen
			console.log('dsadasd', route.params)
			console.log('dsadasddd', isFocused)

			const { updatedName, updatedEmail, updatedLanguage, updatedAvatar } = route.params

			// Cập nhật state nếu có giá trị mới được truyền về
			if (updatedName) setName(updatedName)
			if (updatedEmail) setEmail(updatedEmail)
			if (updatedLanguage) setLanguage(updatedLanguage)
			if (updatedAvatar) setAvatar(updatedAvatar)
		}
	}, [isFocused, route.params]) // Theo dõi khi trang được focus và có params

	return (
		<View style={defaultStyles.container}>
			<ScrollView contentContainerStyle={styles.container}>
				{/* Profile Image and Name */}
				<View style={styles.profileSection}>
					<Image source={avatar} style={styles.profileImage} />
					<Text style={styles.profileName}>{name}</Text>
				</View>

				{/* Edit Button */}
				<Button
					title="Edit"
					onPress={() =>
						navigation.navigate('EditProfileScreen', {
							name,
							email,
							language,
							avatar: avatar ? String(avatar) : null,
						})
					}
				/>

				{/* Personal Information */}
				<Text style={styles.sectionHeader}>Personal Information</Text>
				<View style={styles.content}>
					<Text style={styles.infoText}>{name}</Text>
					<Text style={styles.infoText}>{email}</Text>
					<Text style={styles.infoText}>{language}</Text>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
	},
	profileSection: {
		alignItems: 'center',
		marginBottom: 50,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
	},
	profileName: {
		color: '#fff', // White text for name
		fontSize: 25,
		fontWeight: 'bold',
	},
	sectionHeader: {
		color: '#fff', // White header
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
		paddingBottom: 10,
		paddingTop: 20,
	},
	infoText: {
		color: '#fff', // White text for list items
		fontSize: 18,
		padding: 10,
		borderBottomColor: '#555',
		borderBottomWidth: 1,
		paddingVertical: 15,
	},
	content: {
		paddingBottom: 30,
	},
})
