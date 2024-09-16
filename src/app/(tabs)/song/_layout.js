import { Stack } from 'expo-router'
import { View } from 'react-native'
import { StackScreenWithSearchBar } from '../../../constants/layout'
import { defaultStyles } from '../../../styles'

const SongScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen name="index" options={{ ...StackScreenWithSearchBar, headerTitle: 'Song' }} />
			</Stack>
		</View>
	)
}

export default SongScreenLayout
