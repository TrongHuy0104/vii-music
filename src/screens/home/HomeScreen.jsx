import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BannerList from '../../components/BannerList'
import Header from '../../components/Header'
import useHome from '../../services/home/useHome'
import { defaultStyles } from '../../styles'

import { colors } from '../../constants/tokens'
import HomeTabPlaylist from './HomeTabPlaylist'

export default function HomeScreen() {
	const { isLoading, banners, playlists } = useHome()
	const navigation = useNavigation() // Access navigation object

	if (isLoading)
		return (
			<View style={defaultStyles.container}>
				<Text style={{ color: colors.text }}>Loading...</Text>
			</View>
		)

	return (
		<View style={defaultStyles.container}>
			<Header title="Trang chủ" />
			<BannerList navigation={navigation} banners={banners} />
			<HomeTabPlaylist playlists={playlists} />
		</View>
	)
}

const styles = StyleSheet.create({})
