import React, { useState } from 'react'
// import { StyleSheet, View } from 'react-native'
import { defaultStyles } from '../styles/index'

import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons' // Thêm import từ react-native-vector-icons

import unknowImage from '../../assets/unknown_artist.png'
import ModalEdit from './ModalEdit'

export default function Profile() {
	// const navigation = useNavigation()

	const [modalVisible, setModalVisible] = useState(false) // Quản lý trạng thái modal
	const [name, setName] = useState('Vikashini Vini') // Tên người dùng hiện tại
	const [newName, setNewName] = useState('') // Giá trị nhập vào trong modal

	// Open Modal
	const openModal = () => {
		setNewName(name) // Cập nhật giá trị mới của name để hiển thị trong TextInput
		setModalVisible(true)
	}

	// Hàm lưu tên mới và đóng modal
	const saveName = () => {
		setName(newName) // Cập nhật tên mới
		setModalVisible(false) // Đóng modal
	}

	// Bạn có thể thực hiện lưu tên mới vào cơ sở dữ liệu tại đây
	return (
		<View style={defaultStyles.container}>
			<ScrollView contentContainerStyle={styles.container}>
				{/* Profile Image and Name */}
				<View style={styles.profileSection}>
					<Image
						source={unknowImage} // Replace with your profile image link
						style={styles.profileImage}
					/>
					<Text style={styles.profileName}>Vikashini Vini</Text>
				</View>

				{/* Personal Information Section */}
				<View style={styles.infoSection}>
					<Text style={styles.sectionHeader}>Personal Information</Text>
					<TouchableOpacity style={styles.infoItem} onPress={openModal}>
						<Text style={styles.infoText}>Name</Text>
						<Icon name="chevron-forward-outline" size={20} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.infoItem} onPress={openModal}>
						<Text style={styles.infoText}>Email</Text>
						<Icon name="chevron-forward-outline" size={20} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.infoItem} onPress={openModal}>
						<Text style={styles.infoText}>Language</Text>
						<Icon name="chevron-forward-outline" size={20} color="#fff" />
					</TouchableOpacity>
				</View>

				<ModalEdit
					visible={modalVisible}
					onClose={() => setModalVisible(false)}
					onSave={saveName}
					value={newName}
					onChangeValue={setNewName}
					title="Edit Name"
					placeholder="Enter new name"
				/>

				{/* About Section */}
				<View style={styles.infoSection}>
					<Text style={styles.sectionHeader}>About</Text>
					<TouchableOpacity style={styles.infoItem}>
						<Text style={styles.infoText}>Privacy</Text>
						<Icon name="chevron-forward-outline" size={20} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.infoItem}>
						<Text style={styles.infoText}>Storage</Text>
						<Icon name="chevron-forward-outline" size={20} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.infoItem}>
						<Text style={styles.infoText}>Audio Quality</Text>
						<Icon name="chevron-forward-outline" size={20} color="#fff" />
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 30,
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
	infoSection: {
		marginBottom: 50,
	},
	sectionHeader: {
		color: '#fff', // White header
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	infoItem: {
		flexDirection: 'row', // Đặt icon và text cạnh nhau
		justifyContent: 'space-between', // Đặt text bên trái và icon bên phải
		alignItems: 'center',
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#555', // Gray underline like in the image
	},
	infoText: {
		color: '#fff', // White text for list items
		fontSize: 18,
	},
})
