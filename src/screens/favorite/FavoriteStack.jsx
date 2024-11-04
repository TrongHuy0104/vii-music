import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ArtistProfile from '../ArtistProfile'
import SearchScreen from '../SearchScreen'
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
				name="ArtistProfile"
				component={ArtistProfile}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	)
}
