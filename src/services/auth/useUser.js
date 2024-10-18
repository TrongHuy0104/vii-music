import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../api/apiAuth'

function useUser() {
	const { isLoading, data: user } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	})

	console.log(user)

	return { isLoading, user }
}

export default useUser
