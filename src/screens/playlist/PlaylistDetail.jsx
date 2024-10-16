import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import { defaultStyles } from '../../styles'

export default function PlaylistDetail({ route }) {
	const { encodeId } = route.params
	return (
		<View style={defaultStyles.container}>
			<Header title="Playlist" />
			<Text>Playlist ID: {encodeId}</Text>
			{/* Fetch and display the playlist based on encodeId */}
		</View>
	)
}

const styles = StyleSheet.create({})
