import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import BannerList from '../../components/BannerList'
import Header from '../../components/Header'
import useHome from '../../services/home/useHome'
import { defaultStyles } from '../../styles'
import HomeTabPlaylist from './HomeTabPlaylist'
import NewRelease from './NewRelease'

export default function HomeScreen() {
	const { banners, playlists, newreleases } = useHome()
	const navigation = useNavigation()

	return (
		<View style={defaultStyles.container}>
			<Header title="Trang chủ" />
			<ScrollView showsVerticalScrollIndicator={false}>
				<BannerList navigation={navigation} banners={banners} />
				<HomeTabPlaylist navigation={navigation} playlists={playlists} />
				<NewRelease navigation={navigation} newreleases={newreleases} />
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({})
