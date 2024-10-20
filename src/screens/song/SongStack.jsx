import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../SearchScreen'
// import SongScreen from './SongScreen'
import FavoritePlaylist from '../favorite/FavoritePlaylist'
import UserSongList from '../favorite/UserSongList'
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
				component={FavoritePlaylist}
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
