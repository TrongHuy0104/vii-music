import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout as logoutApi } from '../../api/apiAuth'

export function useLogout() {
	const navigation = useNavigation()
	const queryClient = useQueryClient()

	const { mutate: logout, isPending: isLoading } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			queryClient.removeQueries()
			navigation.navigate('Login')
		},
	})

	return { logout, isLoading }
}
