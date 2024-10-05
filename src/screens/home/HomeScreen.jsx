import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import { defaultStyles } from '../../styles'

import NewReleaseGrid from './NewRelease'

export default function HomeScreen() {
	return (
		<View style={defaultStyles.container}>
			<Header title="Trang chủ" />
			<NewReleaseGrid />
		</View>
	)
}

const styles = StyleSheet.create({})
