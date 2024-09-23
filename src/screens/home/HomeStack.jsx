import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../SearchScreen'
import HomeScreen from './HomeScreen'

const Stack = createNativeStackNavigator()

export default function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				lazy: true, // Only active screen is rendered
			}}
		>
			<Stack.Screen
				name="Home"
				options={{
					headerShown: false,
				}}
				component={HomeScreen}
			/>
			<Stack.Screen
				name="Search"
				component={SearchScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	)
}
