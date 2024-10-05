import { useEffect, useRef } from 'react'
import TrackPlayer, { Capability, RatingType, RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	})

	await TrackPlayer.updateOptions({
		ratingType: RatingType.Heart,
		capabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
			Capability.Stop,
		],
	})

	await TrackPlayer.setVolume(0.3) // not too loud
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

// const loadActiveTrack = async () => {
// 	try {
// 		const savedTrackData = await AsyncStorage.getItem('activeTrack')
// 		if (savedTrackData) {
// 			const track = JSON.parse(savedTrackData)

// 			// Add the track to the TrackPlayer queue
// 			await TrackPlayer.load(track)
// 		}
// 	} catch (error) {
// 		console.error('Failed to load the active track', error)
// 	}
// }

export const useSetupTrackPlayer = ({ onLoad }) => {
	const isInitialized = useRef(false)

	useEffect(() => {
		if (isInitialized.current) return

		setupPlayer()
			.then(() => {
				isInitialized.current = true
				if (onLoad) onLoad()
			})
			.catch((error) => {
				isInitialized.current = false
				console.error(error)
			})
	}, [onLoad])
}
