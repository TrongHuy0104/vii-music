import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import { defaultStyles } from '../../styles'
import BannerList from '../../components/BannerList'
import { useNavigation } from '@react-navigation/native'

import useBanners from '../../services/home/useBanners'
export default function HomeScreen() {
	const navigation = useNavigation() // Access navigation object
	return (
		<View style={defaultStyles.container}>
			<Header title="Trang chủ" />
			<BannerList navigation={navigation} />
		</View>
	)
}

const styles = StyleSheet.create({})
