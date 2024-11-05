import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import Profile from '../../components/Profile'
import { colors } from '../../constants/tokens'
import useUser from '../../services/auth/useUser'
import { downloadSong } from '../../services/downloadService'
import { defaultStyles } from '../../styles'

export default function UserScreen() {
	const { isLoading, user } = useUser()
	const navigation = useNavigation()
	const handleDownload = () => {
		downloadSong() // Gọi hàm tải nhạc khi nhấn nút
	}
	if (isLoading) return <ActivityIndicator color={colors.icon} />
	return (
		<View style={defaultStyles.container}>
			<Header title="Cá nhân" />
			<Button title="Tải Bài Hát" onPress={handleDownload} />
			<Profile navigation={navigation} user={user} />
		</View>
	)
}

const styles = StyleSheet.create({})
