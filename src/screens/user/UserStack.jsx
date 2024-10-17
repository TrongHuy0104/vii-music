import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../SearchScreen'
import EditProfileScreen from './EditProfileScreen'
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
				name="EditProfileScreen"
				component={EditProfileScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	)
}
