import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { unknownTrackImageUri } from '../constants/images'
import { colors, fontSize } from '../constants/tokens'
import { formatSongDuration } from '../utils/helpers'

export default function PlaylistThumb({ thumbnails, numSongs, duration }) {
	return (
		<View style={styles.container}>
			{/* Conditional rendering based on thumbnails length */}
			{thumbnails.length < 4 ? (
				<Image
					style={styles.thumbnailGrid}
					source={thumbnails}
					placeholder={unknownTrackImageUri}
					contentFit="cover"
					transition={1000}
				/>
			) : (
				<View style={styles.thumbnailGrid}>
					{thumbnails.map((thumbnail, index) => (
						<Image
							key={index}
							style={[styles.thumb, styles[`thumb${index}`]]}
							source={{ uri: thumbnail }}
							placeholder={unknownTrackImageUri}
							contentFit="cover"
						/>
					))}
				</View>
			)}
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
	thumbnailGrid: {
		width: 200,
		height: 200,
		flexDirection: 'row',
		flexWrap: 'wrap',
		position: 'relative',
	},
	thumb: {
		width: 98, // Width for 2x2 grid
		height: 98, // Height for 2x2 grid
		borderRadius: 4,
	},
	thumb0: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
	thumb1: {
		position: 'absolute',
		top: 0,
		right: 0,
	},
	thumb2: {
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
	thumb3: {
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
	text: {
		color: colors.textMuted,
		fontSize: fontSize.sm,
		marginVertical: 12,
	},
})
