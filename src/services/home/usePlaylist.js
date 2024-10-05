import { useQuery } from '@tanstack/react-query'
import { getHome } from '../../api'

function usePlaylist() {
	const { isPending: isLoadingPlaylist, data } = useQuery({
		queryKey: ['playlists'],
		queryFn: getHome,
	})

	const playlists = data?.data?.data?.items?.filter((item) => item.sectionType === 'playlist') || []

	const playlistItems = playlists.flatMap((section) => section.items || [])

	return { isLoadingPlaylist, playlistItems, playlists }
}

export default usePlaylist
