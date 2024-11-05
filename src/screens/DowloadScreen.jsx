// src/screens/DownloadScreen.js
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { downloadSong } from '../services/downloadService'

export default function DownloadScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Download Music</Text>
			<Button title="Tải bài hát" onPress={downloadSong} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
})
