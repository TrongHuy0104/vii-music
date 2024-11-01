import { useQuery } from '@tanstack/react-query'
import { getFavoriteSongs } from '../../api/apiSong'
import useUser from '../auth/useUser'

function useFavoriteSongs() {
	const { user } = useUser()

	const { isLoading: isLoadingFavoriteSongs, data: favoriteSongs } = useQuery({
		queryKey: ['favoriteSongs', favoriteSongs?.length], // Include user ID to ensure unique cache for each user
		queryFn: () => getFavoriteSongs({ userId: user?.user_metadata.sub }),
		cacheTime: 0, // Disable caching
		staleTime: 0, // Data is considered stale immediately
		enabled: !!user?.user_metadata.sub, // Only run the query if the user ID is available
	})

	return { isLoadingFavoriteSongs, favoriteSongs }
}

export default useFavoriteSongs
