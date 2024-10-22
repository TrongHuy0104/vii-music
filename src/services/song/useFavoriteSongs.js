import { useQuery } from '@tanstack/react-query'
import { getFavoriteSongs } from '../../api/apiSong'
import useUser from '../auth/useUser'

function useFavoriteSongs() {
	const { user } = useUser()
	const { isLoading: isLoadingFavoriteSongs, data: favoriteSongs } = useQuery({
		queryKey: ['favoriteSongs'],
		queryFn: () => getFavoriteSongs({ userId: user?.user_metadata.sub }),
	})

	return { isLoadingFavoriteSongs, favoriteSongs }
}

export default useFavoriteSongs
