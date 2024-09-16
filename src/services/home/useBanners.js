import { useQuery } from '@tanstack/react-query'
import { getHome } from '../../api'

function useBanners() {
	const { isPending: isLoadingBanners, data } = useQuery({
		queryKey: ['banners'],
		queryFn: getHome,
	})
	const banners = data?.data?.data?.items?.find((item) => item.sectionType === 'banner')?.items

	return { isLoadingBanners, banners }
}

export default useBanners
