import { useQuery } from '@tanstack/react-query'
import { getDetailPlaylist } from '../../api'

function useDetailPlaylist() {
	const { isPending: isLoadingPlaylist, data } = useQuery({
		queryKey: ['playlist'],
		queryFn: () => getDetailPlaylist('67WIO6CF'),
	})
	const playlists = data?.data?.data

	return { isLoadingPlaylist, playlists }
}

export default useDetailPlaylist
