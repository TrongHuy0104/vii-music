import { useQuery } from '@tanstack/react-query'
import { getHome } from '../../api'

function useHome() {
	const { isPending: isLoading, data } = useQuery({
		queryKey: ['home'],
		queryFn: getHome,
	})
	const banners = data?.data?.data?.items?.find((item) => item.sectionType === 'banner')?.items

	return { isLoading, banners }
}

export default useHome
