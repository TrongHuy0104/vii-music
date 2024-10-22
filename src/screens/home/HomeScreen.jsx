import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BannerList from '../../components/BannerList'
import useHome from '../../services/home/useHome'
import { defaultStyles } from '../../styles'

import Header from '../../components/Header'
import { colors } from '../../constants/tokens'
import useUser from '../../services/auth/useUser'
import HomeTabPlaylist from './HomeTabPlaylist'

export default function HomeScreen() {
	const { isLoading: isLoadingHome, banners, playlists } = useHome()
	const { isLoading: isLoadingUser } = useUser()

	const navigation = useNavigation() // Access navigation object

	if (isLoadingUser || isLoadingHome)
		return (
			<View style={defaultStyles.container}>
				<Text style={{ color: colors.text }}>Loading...</Text>
			</View>
		)

	return (
		<View style={defaultStyles.container}>
			<Header title="Trang chủ" />
			<BannerList navigation={navigation} banners={banners} />
			<HomeTabPlaylist navigation={navigation} playlists={playlists} />
		</View>
	)
}

const styles = StyleSheet.create({})
