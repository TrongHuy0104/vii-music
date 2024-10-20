import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fontSize, fontWeight } from '../constants/tokens'

const ArtistItem = ({ artist, onAddArtist }) => {
	return (
		<View style={styles.artistContainer}>
			<Image source={{ uri: artist.thumbnailM }} style={styles.thumbnail} />
			<View style={styles.artistInfo}>
				<Text style={styles.artistName}>{artist.name}</Text>
				<Text style={styles.artistFollowers}>{artist.totalFollow} quan tâm</Text>
			</View>
			{!artist.isFollow && (
				<TouchableOpacity style={styles.followButton} onPress={() => onAddArtist(artist)}>
					<Text style={styles.followButtonText}>QUAN TÂM</Text>
				</TouchableOpacity>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	artistContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
	},
	thumbnail: {
		width: 45,
		height: 45,
		borderRadius: 25,
	},
	artistInfo: {
		flex: 1,
		marginLeft: 10,
	},
	artistName: {
		fontSize: fontSize.xm,
		fontWeight: fontWeight.medium,
		color: colors.text,
	},
	artistFollowers: {
		fontSize: fontSize.xs,
		color: colors.textMuted,
	},
	followButton: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderWidth: 1,
		borderRadius: 30,
		borderColor: colors.maximumTrackTintColor,
	},
	followButtonText: {
		fontSize: 9,
		color: colors.textMuted,
	},
})

export default ArtistItem
