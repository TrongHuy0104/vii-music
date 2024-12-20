import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import { defaultStyles } from '../../styles'
import FavoritePlaylist from '../favorite/FavoritePlaylist'

export default function PlaylistScreen() {
	return (
		<View style={defaultStyles.container}>
			<Header title="Playlist" />
			<FavoritePlaylist />
		</View>
	)
}

const styles = StyleSheet.create({})
