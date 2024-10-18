import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'
import { unknownTrackImageUri } from '../constants/images'
import { getStringData } from '../hooks/useAsyncStorage'
import { useLastActiveTrack } from '../hooks/useLastActiveTrack'
import useDetailPlaylist from '../services/home/useDetailPlaylist'
import useSongInfo from '../services/home/useSongInfo'
import { useQueue } from '../store/queue'
import { defaultStyles } from '../styles'
import { getInPremiumSongs } from '../utils/helpers'
import * as rootNavigation from '../utils/rootNavigation'
import { MovingText } from './MovingText'
import { PlayPauseButton, SkipToNextButton } from './PlayerControls'

export const FloatingPlayer = () => {
	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()
	const { currentTrackId, setCurrentTrackId } = useQueue()
	const [playlistsId, setPlaylistsId] = useState(null) // State to store playlistsId
	const [loading, setLoading] = useState(true) // State to handle loading

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
	const displayedTrack = activeTrack ?? lastActiveTrack

	const { songInfo, isLoadingSongInfo, song: songAudio } = useSongInfo()
	const { playlists, isLoadingPlaylist } = useDetailPlaylist(playlistsId)

	const handleNextSong = () => {
		const filterSongs = getInPremiumSongs(playlists.song.items)

		const currentIndex = filterSongs.findIndex((song) => song.encodeId === displayedTrack?.encodeId)
		if (currentIndex >= 0) {
			const nextIndex = currentIndex + 1 === playlists.length ? 0 : currentIndex + 1

			setCurrentTrackId(filterSongs?.[nextIndex]?.encodeId)
		}
	}

	const handlePress = () => {
		rootNavigation.navigate('Player', { encodeId: displayedTrack.encodeId })
	}

	useEffect(() => {
		const fetchData = async () => {
			if (loading || isLoadingSongInfo || isLoadingPlaylist) return

			await TrackPlayer.pause()
			await TrackPlayer.load({ ...songInfo.data, url: songAudio.data[128] })
			// if (currentTrackId) {
			await TrackPlayer.play()
			// }
		}
		fetchData()
	}, [isLoadingSongInfo, isLoadingPlaylist, songAudio, songInfo, currentTrackId])

	if (!displayedTrack) return null

	return (
		<TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={handlePress}>
			<>
				<Image
					style={{ ...styles.trackArtworkImage }}
					source={displayedTrack.thumbnailM}
					placeholder={unknownTrackImageUri}
					contentFit="cover"
					transition={1000}
				/>
				<View style={styles.trackTitleContainer}>
					{/* <Text style={styles.trackTitle}>{displayedTrack.title}</Text> */}
					<MovingText
						style={styles.trackTitle}
						text={displayedTrack.title}
						animationThreshold={25}
					/>
				</View>
				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} handleNextSong={handleNextSong} />
				</View>
			</>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#3B3B4A',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
		position: 'absolute',
		left: 12,
		right: 12,
		bottom: 60,
	},
	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
})
