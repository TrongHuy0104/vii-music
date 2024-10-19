import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ArtistProfile from '../ArtistProfile'
import SearchScreen from '../SearchScreen'
import PlaylistScreen from './PlaylistScreen'

const Stack = createNativeStackNavigator()

export default function PlaylistStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				lazy: true, // Only active screen is rendered
			}}
		>
			<Stack.Screen
				name="Playlist"
				options={{
					headerShown: false,
				}}
				component={PlaylistScreen}
			/>
			<Stack.Screen
				name="Search"
				component={SearchScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="ArtistProfile"
				component={ArtistProfile}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	)
}
