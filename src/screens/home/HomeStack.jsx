import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../SearchScreen'
import HomeScreen from './HomeScreen'
import NewReleaseList from './NewReleaseList'
import SongListScreen from './SongListScreen'

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
			<Stack.Screen
				name="SongList"
				component={SongListScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="NewReleaseList"
				component={NewReleaseList}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	)
}
