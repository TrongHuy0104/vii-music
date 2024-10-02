import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { unknownTrackImageUri } from '../constants/images'
import { colors, fontSize } from '../constants/tokens'
import { defaultStyles } from '../styles'

export default function TrackListItem({ track }) {
	const { title, thumbnailM, artistsNames } = track
	const isActiveTrack = false
	return (
		<TouchableHighlight>
			<View style={styles.trackItemContainer}>
				{/* Track thumb */}
				<View>
					<Image
						style={{ ...styles.trackArtworkImage, opacity: isActiveTrack ? 0.6 : 1 }}
						source={thumbnailM}
						placeholder={unknownTrackImageUri}
						contentFit="cover"
						transition={1000}
					/>
				</View>
				{/* Tack title + artist */}
				<View style={{ width: '100%' }}>
					<Text
						numberOfLines={1}
						style={{
							...styles.trackTitleText,
							color: isActiveTrack ? colors.primary : colors.text,
						}}
					>
						{title}
					</Text>
					{artistsNames && (
						<Text numberOfLines={1} style={styles.trackArtistText}>
							{artistsNames}
						</Text>
					)}
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
})
