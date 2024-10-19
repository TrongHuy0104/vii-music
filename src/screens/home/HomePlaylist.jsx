import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

const HomePlaylist = ({ playlistItem, onPress }) => {
	return (
		<TouchableOpacity
			style={styles.bannerContainer}
			onPress={() => onPress(playlistItem)}
			activeOpacity={0.8}
		>
			{playlistItem.thumbnail ? (
				<Image source={{ uri: playlistItem.thumbnail }} style={styles.bannerImage} />
			) : (
				<Text>No Thumbnail</Text>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	bannerContainer: {
		flex: 1,
		margin: 8,
	},
	bannerImage: {
		width: '100%',
		height: 180,
		borderRadius: 8,
		objectFit: 'cover',
	},
})

export default HomePlaylist
