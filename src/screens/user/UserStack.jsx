import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ArtistProfile from '../ArtistProfile'
import SearchScreen from '../SearchScreen'
import UserScreen from './UserScreen'

const Stack = createNativeStackNavigator()

export default function UserStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				lazy: true, // Only active screen is rendered
			}}
		>
			<Stack.Screen
				name="User"
				options={{
					headerShown: false,
				}}
				component={UserScreen}
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
				initialParams={{ artistLink }} // Cho phép truyền ID nghệ sĩ
			/>
		</Stack.Navigator>
	)
}
