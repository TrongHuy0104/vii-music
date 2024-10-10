import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BannerList from '../../components/BannerList'
import Header from '../../components/Header'
import useHome from '../../services/home/useHome'
import { defaultStyles } from '../../styles'

import HomeTabPlaylist from './HomeTabPlaylist'

export default function HomeScreen() {
	const { isLoading, banners } = useHome()
	const navigation = useNavigation() // Access navigation object

	if (isLoading)
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		)

	return (
		<View style={defaultStyles.container}>
			<Header title="Trang chủ" />
			<BannerList navigation={navigation} banners={banners} />
			<HomeTabPlaylist />
		</View>
	)
}

const styles = StyleSheet.create({})
