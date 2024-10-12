import { useQuery } from '@tanstack/react-query'
import { getHome } from '../../api'

function useHome() {
	const { isPending: isLoading, data } = useQuery({
		queryKey: ['home'],
		queryFn: getHome,
	})

	const banners = data?.data?.data?.items?.find((item) => item.sectionType === 'banner')?.items

	const playlists = data?.data?.data?.items?.filter((item) => item.sectionType === 'playlist') || []

	const newrealeases =
		data?.data?.data?.items?.find((item) => item.sectionType === 'new-release')?.items?.all || []

	return { isLoading, banners, playlists, newrealeases }
}

export default useHome
