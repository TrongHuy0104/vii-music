import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import BannerList from '../../components/BannerList'
import Header from '../../components/Header'
import { colors } from '../../constants/tokens'
import useUser from '../../services/auth/useUser'
import useHome from '../../services/home/useHome'
import { defaultStyles } from '../../styles'
import HomeTabPlaylist from './HomeTabPlaylist'
import NewRelease from './NewRelease'

export default function HomeScreen() {
	const { isLoading: isLoadingHome, banners, playlists, newreleases } = useHome()
	const { isLoading: isLoadingUser } = useUser()

	const navigation = useNavigation() // Access navigation object

	if (isLoadingUser || isLoadingHome)
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)

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
