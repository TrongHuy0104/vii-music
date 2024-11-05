import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import { defaultStyles } from '../../styles'
import DownloadedSongsList from './DownloadedSongsList'

export default function DownloadScreen() {
	return (
		<View style={defaultStyles.container}>
			<Header title="Playlist" />
			<DownloadedSongsList />
		</View>
	)
}

const styles = StyleSheet.create({})
