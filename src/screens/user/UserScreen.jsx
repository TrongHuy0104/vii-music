import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import ArtistProfile from '../../components/ArtistProfile'
import Header from '../../components/Header'
import { colors } from '../../constants/tokens'
import useUser from '../../services/auth/useUser'
import { defaultStyles } from '../../styles'

export default function UserScreen() {
	const { isLoading, user } = useUser()
	if (isLoading) return <ActivityIndicator color={colors.icon} />
	return (
		<View style={defaultStyles.container}>
			<Header title="Cá nhân" />
			<ArtistProfile />
		</View>
	)
}

const styles = StyleSheet.create({})
