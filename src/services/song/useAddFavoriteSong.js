import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { addMySong } from '../../api/apiSong'

function useAddFavoriteSong() {
	const queryClient = useQueryClient()
	const { mutate: addFavoriteSong, isPending: isLoadingAdd } = useMutation({
		mutationFn: ({ encodeId, favoriteSongData, songData }) =>
			addMySong({ encodeId, favoriteSongData, songData }),
		onSuccess: () => {
			Toast.show({
				type: 'success',
				text1: 'Bài hát đã được thêm vào danh sách yêu thích!',
			}),
				queryClient.invalidateQueries({
					queryKey: ['favoriteSongs'],
				})
		},
		onError: (err) => {
			console.error('err', err.message)
		},
	})

	return { addFavoriteSong, isLoadingAdd }
}

export default useAddFavoriteSong
