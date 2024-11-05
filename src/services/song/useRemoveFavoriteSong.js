import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { removeFavoriteSong as removeFavoriteSongApi } from '../../api/apiSong'

function useRemoveFavoriteSong() {
	const queryClient = useQueryClient()
	const { mutate: removeFavoriteSong, isPending: isLoadingRemove } = useMutation({
		mutationFn: ({ userId, encodeId }) => removeFavoriteSongApi({ userId, encodeId }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['favoriteSongs'],
			})
			Toast.show({
				type: 'success',
				text1: 'Bài hát đã xóa khỏi danh sách yêu thích!',
			})
		},
		onError: (err) => {
			console.error('err', err.message)
		},
	})

	return { removeFavoriteSong, isLoadingRemove }
}

export default useRemoveFavoriteSong
