import { Stack } from 'expo-router'
import { View } from 'react-native'
import { StackScreenWithSearchBar } from '../../../constants/layout'
import { defaultStyles } from '../../../styles'

const HomeScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen name="index" options={{ ...StackScreenWithSearchBar }} />
			</Stack>
		</View>
	)
}

export default HomeScreenLayout
