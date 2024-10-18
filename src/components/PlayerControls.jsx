import { FontAwesome6 } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import { colors } from '../constants/tokens'
import { useLastActiveTrack } from '../hooks/useLastActiveTrack'
import { useQueue } from '../store/queue'
import { getInPremiumSongs } from '../utils/helpers'

export const PlayerControls = ({ style, playlists }) => {
	const activeTrack = useLastActiveTrack()

	const { currentTrackId, setCurrentTrackId } = useQueue()
	const filterSongs = getInPremiumSongs(playlists.song.items)

	const currentIndex = filterSongs.findIndex((song) => song.encodeId === activeTrack?.encodeId)

	const handleNextSong = () => {
		if (currentIndex >= 0) {
			const nextIndex = currentIndex + 1 === playlists.length ? 0 : currentIndex + 1

			setCurrentTrackId(filterSongs?.[nextIndex]?.encodeId)
		}
	}
	const handlePrevSong = () => {
		if (currentIndex >= 0) {
			const prevIndex = currentIndex - 1 < 0 ? playlists.length - 1 : currentIndex - 1
			setCurrentTrackId(filterSongs?.[prevIndex]?.encodeId)
		}
	}
	return (
		<View style={[styles.container, style]}>
			<View style={styles.row}>
				<SkipToPreviousButton handlePrevSong={handlePrevSong} />

				<PlayPauseButton />

				<SkipToNextButton handleNextSong={handleNextSong} />
			</View>
		</View>
	)
}

export const PlayPauseButton = ({ iconSize = 45, styles }) => {
	const { playing } = useIsPlaying()
	return (
		<View style={[{ height: iconSize }, styles]}>
			<TouchableOpacity
				activeOpacity={0.85}
				onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
			>
				<FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={colors.text} />
			</TouchableOpacity>
		</View>
	)
}

export const SkipToNextButton = ({ iconSize = 28, handleNextSong }) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => handleNextSong()}>
			<FontAwesome6 name="forward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

export const SkipToPreviousButton = ({ iconSize = 28, handlePrevSong }) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => handlePrevSong()}>
			<FontAwesome6 name="backward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
})
