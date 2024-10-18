import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { signUp as signUpApi } from '../../api/apiAuth'

function useSignUp() {
	const navigation = useNavigation()
	const { mutate: signUp, isPending: isLoading } = useMutation({
		mutationFn: signUpApi,
		onSuccess: () => {
			Toast.show({
				type: 'success',
				text1: 'Tạo thành công! Vui lòng đăng nhập lại!',
			})
			navigation.navigate('Login')
		},
		onError: (err) => {
			console.error('err', err.message)
			Toast.show({
				type: 'error',
				text1: err.message,
			})
			// toast.error("Provider password or email is incorrect");
		},
	})

	return { signUp, isLoading }
}

export default useSignUp
