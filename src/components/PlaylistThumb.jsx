import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { unknownTrackImageUri } from '../constants/images'
import { colors, fontSize } from '../constants/tokens'
import { formatSongDuration } from '../utils/helpers'

export default function PlaylistThumb({ thumbnail, numSongs, duration }) {
	return (
		<View style={styles.container}>
			<Image
				style={styles.thumb}
				source={thumbnail}
				placeholder={unknownTrackImageUri}
				contentFit="cover"
				transition={1000}
			/>
			<Text style={styles.text}>
				{numSongs} bài hát • {formatSongDuration(duration)}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingTop: 12,
		paddingBottom: 4,
	},
	thumb: {
		width: 200,
		height: 200,
		borderRadius: 4,
	},
	text: {
		color: colors.textMuted,
		fontSize: fontSize.sm,
		marginVertical: 12,
	},
})
