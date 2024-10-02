import { useNavigation } from '@react-navigation/native'

export function useGoBack() {
	const navigate = useNavigation()
	return () => navigate.goBack()
}
