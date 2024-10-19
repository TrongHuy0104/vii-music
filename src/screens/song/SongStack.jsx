import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../SearchScreen'
import FavoriteSongList from './FavoriteSongList'
import SongScreen from './SongScreen'

const Stack = createNativeStackNavigator()

export default function SongStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				lazy: true, // Only active screen is rendered
			}}
		>
			<Stack.Screen
				name="Song"
				options={{
					headerShown: false,
				}}
				component={SongScreen}
			/>
			<Stack.Screen
				name="Search"
				component={SearchScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="FavoriteSongs"
				component={FavoriteSongList}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	)
}
