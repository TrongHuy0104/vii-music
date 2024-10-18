import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { signIn as signInApi } from '../../api/apiAuth'

function useSignIn() {
	const queryClient = useQueryClient()
	const navigation = useNavigation()
	const { isPending: isLoadingSignIn, mutate: signIn } = useMutation({
		mutationFn: ({ email, password }) => {
			return signInApi({ email, password })
		},
		retry: false,
		onSuccess: (user) => {
			queryClient.setQueryData(['user'], user.user)
			navigation.navigate('Main')
		},
		onError: (err) => {
			console.error('err', err)
			Toast.show({
				type: 'error',
				text1: 'Tài khoản hoặc mật khẩu không chính xác!',
			})
			// toast.error("Provider password or email is incorrect");
		},
	})

	return { isLoadingSignIn, signIn }
}

export default useSignIn
