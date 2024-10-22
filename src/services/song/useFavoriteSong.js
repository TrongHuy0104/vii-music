import { useQuery } from '@tanstack/react-query'
import { getFavoriteSongs } from '../../api/apiSong'

function useFavoriteSong() {
	const { isLoading: isLoadingFavoriteSong, data: favoriteSong } = useQuery({
		queryKey: ['favoriteSong'],
		queryFn: ({ encodeId, userId }) => getFavoriteSongs({ encodeId, userId }),
	})
	return { isLoadingFavoriteSong, favoriteSong }
}

export default useFavoriteSong
