import { useQuery } from '@tanstack/react-query'
import { getDetailPlaylist } from '../../api'

function useDetailPlaylist(encodeId) {
	const { isPending: isLoadingPlaylist, data } = useQuery({
		queryKey: ['playlist'],
		queryFn: () => getDetailPlaylist(encodeId),
		// cacheTime: 0,
	})
	const playlists = data?.data?.data

	return { isLoadingPlaylist, playlists }
}

export default useDetailPlaylist
