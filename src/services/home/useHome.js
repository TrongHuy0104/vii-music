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

	const newReleaseSection = data?.data?.data?.items?.find(
		(item) => item.sectionType === 'new-release',
	)
	const newReleaseTitle = newReleaseSection?.title || ''

	return { isLoading, banners, playlists, newrealeases, newReleaseTitle }
}

export default useHome
