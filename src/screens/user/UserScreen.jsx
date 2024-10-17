import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import Profile from '../../components/Profile'
import { defaultStyles } from '../../styles'
// import EditProfileView from './EditProfileScreen'
import { useNavigation } from '@react-navigation/native'

export default function UserScreen() {
	const navigation = useNavigation()
	return (
		<View style={defaultStyles.container}>
			<Header title="Cá nhân" />
			<Profile navigation={navigation} />
		</View>
	)
}

const styles = StyleSheet.create({})
