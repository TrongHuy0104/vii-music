import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../api/apiAuth'

function useUser() {
	const { isLoading, data: user } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	})

	return { isLoading, user }
}

export default useUser
