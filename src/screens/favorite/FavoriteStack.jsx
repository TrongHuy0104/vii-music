import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../SearchScreen'
// import SongScreen from './SongScreen'
import UserSongList from '../favorite/UserSongList'
import FavoriteScreen from './FavoriteScreen'

const Stack = createNativeStackNavigator()

export default function FavoriteStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				lazy: true, // Only active screen is rendered
			}}
		>
			<Stack.Screen
				name="Favorite"
				options={{
					headerShown: false,
				}}
				component={FavoriteScreen}
			/>
			<Stack.Screen
				name="Search"
				component={SearchScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="UserSongList"
				component={UserSongList}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	)
}
