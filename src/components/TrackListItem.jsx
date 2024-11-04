import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'
import { unknownTrackImageUri } from '../constants/images'
import { colors, fontSize } from '../constants/tokens'
import { useTrackPlayerFavorite } from '../hooks/useTrackPlayerFavorite'
import { defaultStyles } from '../styles'
import FavoriteButton from './FavoriteButton'

export default function TrackListItem({
	track,
	onTrackSelect: handleTrackSelect,
	isInFavorite = false,
}) {
	const {
		isFavorite,
		isLoading: isLoadingFavorite,
		isLoadingAdd,
		toggleFavorite,
		isLoadingRemove,
	} = useTrackPlayerFavorite(track)
	const { title, thumbnailM, artistsNames } = track
	const isActiveTrack = useActiveTrack()?.encodeId === track.encodeId
	// if (isLoadingFavorite || isLoadingAdd || isLoadingRemove)
	// 	return (
	// 		<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
	// 			<ActivityIndicator color={colors.icon} />
	// 		</View>
	// 	)
	return (
		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
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

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{ width: '90%', marginRight: 8 }}>
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
					{isInFavorite && (
						<View>
							<FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
						</View>
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
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
})
