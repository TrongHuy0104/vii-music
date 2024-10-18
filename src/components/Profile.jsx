import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { defaultStyles } from '../styles/index'

import unknownImage from '../../assets/unknown_artist.png'
import { useLogout } from '../services/auth/useLogout'
import Button from './AuthButton'

export default function Profile({ user }) {
	const { logout, isLoading } = useLogout()
	// Default user information
	const [avatar, setAvatar] = useState(unknownImage)

	return (
		<View style={defaultStyles.container}>
			<ScrollView contentContainerStyle={styles.container}>
				{/* Profile Image and Name */}
				<View style={styles.profileSection}>
					<Image source={avatar} style={styles.profileImage} />
					<Text style={styles.profileName}>{user.user_metadata.fullName || 'Cá nhân'}</Text>
				</View>

				<View style={styles.content}>
					<Text style={styles.infoText}>{user.user_metadata.email}</Text>
				</View>
				<Button title={`${isLoading ? 'Đang tải...' : 'Đăng xuất'}`} onPress={logout} />
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
