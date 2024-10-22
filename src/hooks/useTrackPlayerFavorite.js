import { useEffect, useState } from 'react'
import { useActiveTrack } from 'react-native-track-player'
import { getFavoriteSongs } from '../api/apiSong'
import useUser from '../services/auth/useUser'
import useAddFavoriteSong from '../services/song/useAddFavoriteSong'
import useRemoveFavoriteSong from '../services/song/useRemoveFavoriteSong'

export const useTrackPlayerFavorite = (track) => {
	const [isFavorite, setIsFavorite] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const activeTrack = useActiveTrack()
	const { isLoadingUser, user } = useUser()
	const { addFavoriteSong, isLoadingAdd } = useAddFavoriteSong()
	const { removeFavoriteSong, isLoadingRemove } = useRemoveFavoriteSong()

	const currentTrack = track || activeTrack

	const toggleFavorite = () => {
		if (isFavorite) {
			removeFavoriteSong({ userId: user?.user_metadata.sub, encodeId: currentTrack.encodeId })
			setIsFavorite(false)
			return
		}
		addFavoriteSong({
			encodeId: currentTrack.encodeId,
			favoriteSongData: {
				userId: user?.user_metadata.sub,
				encodeId: currentTrack.encodeId,
			},
			songData: {
				title: currentTrack.title,
				artistsNames: currentTrack.artistsNames,
				thumbnailM: currentTrack.thumbnailM,
				duration: currentTrack.duration,
				streamingStatus: currentTrack.streamingStatus,
				url: currentTrack?.url,
				encodeId: currentTrack.encodeId,
			},
		})
		setIsFavorite(true)
	}

	useEffect(() => {
		if (isLoadingUser) return
		async function fetchData() {
			try {
				setIsLoading(true)
				const favorites = await getFavoriteSongs({ userId: user?.user_metadata.sub })
				setIsFavorite(favorites.find((track) => track.encodeId === currentTrack?.encodeId))
				setIsLoading(false)
			} catch (error) {
				setIsLoading(false)
				console.error(error.message)
			}
		}
		fetchData()
	}, [isLoadingUser, currentTrack?.encodeId, user?.user_metadata.sub])
	return { isFavorite, setIsFavorite, isLoading, toggleFavorite, isLoadingAdd, isLoadingRemove }
}
