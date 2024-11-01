import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'
import FavoriteButton from '../components/FavoriteButton'
import Heading from '../components/Heading'
import { MovingText } from '../components/MovingText'
import { PlayerControls } from '../components/PlayerControls'
import { PlayerProgressBar } from '../components/PlayerProgressbar'
import { unknownTrackImageUri } from '../constants/images'
import { colors, fontSize, screenPadding } from '../constants/tokens'
import { getStringData } from '../hooks/useAsyncStorage'
import { usePlayerBackground } from '../hooks/usePlayerBackground'
import { useTrackPlayerFavorite } from '../hooks/useTrackPlayerFavorite'
import useDetailPlaylist from '../services/home/useDetailPlaylist'
import { defaultStyles } from '../styles'

export default function PlayerScreen() {
	const activeTrack = useActiveTrack()
	const [playlistsId, setPlaylistsId] = useState(null) // State to store playlistsId
	const [loading, setLoading] = useState(true)
	// State to handle loading

	const { playlists, isLoadingPlaylist } = useDetailPlaylist(playlistsId)
	const { bgImgColors } = usePlayerBackground(activeTrack?.thumbnailM ?? unknownTrackImageUri)
	const {
		isFavorite,
		isLoading: isLoadingFavorite,
		isLoadingAdd,
		toggleFavorite,
		isLoadingRemove,
	} = useTrackPlayerFavorite()
	// Fetch playlistsId asynchronously
	useEffect(() => {
		const fetchPlaylistsId = async () => {
			try {
				const id = await getStringData('playlistId')
				setPlaylistsId(id)
			} catch (error) {
				console.error('Error fetching playlist ID:', error)
			} finally {
				setLoading(false) // Set loading to false after fetching
			}
		}

		fetchPlaylistsId()
	}, [])

	if (loading || isLoadingPlaylist || !activeTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)
	}

	return (
		<LinearGradient
			style={{ flex: 1 }}
			colors={
				bgImgColors
					? [bgImgColors?.dominant, bgImgColors?.lightVibrant]
					: [colors.background, colors.primary]
			}
		>
			<View style={styles.overlayContainer}>
				<Heading title="Trình phát nhạc" />
				<View style={styles.artworkImageContainer}>
					<Image
						style={{ ...styles.artworkImage }}
						source={activeTrack.thumbnailM}
						placeholder={unknownTrackImageUri}
						contentFit="cover"
					/>
				</View>
				<View style={{ flex: 1 }}>
					<View style={{ marginVertical: 'auto' }}>
						<View style={{ height: 60 }}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<View style={styles.trackTitleContainer}>
									<MovingText
										text={activeTrack.title ?? ''}
										animationThreshold={30}
										style={styles.trackTitleText}
									/>
								</View>
								{isLoadingAdd || isLoadingRemove ? (
									<ActivityIndicator />
								) : (
									<FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
								)}
							</View>
							{activeTrack.artistsNames && (
								<Text numberOfLines={1} style={[styles.trackArtistText, { marginTop: 6 }]}>
									{activeTrack.artistsNames}
								</Text>
							)}
						</View>
						<PlayerControls style={{ marginTop: 40 }} playlists={playlists} />
						<PlayerProgressBar activeTrack={activeTrack} style={{ marginTop: 40 }} />
					</View>
				</View>
			</View>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	artworkImageContainer: {
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 11.0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: '45%',
		marginTop: 30,
	},
	artworkImage: {
		width: '90%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		opacity: 0.8,
		maxWidth: '90%',
	},
})
