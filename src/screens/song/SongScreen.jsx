import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import { defaultStyles } from '../../styles'

export default function SongScreen() {
	return (
		<View style={defaultStyles.container}>
			<Header title="Bài hát" />
		</View>
	)
}

const styles = StyleSheet.create({})
