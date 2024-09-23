import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import createBottomTabNavigator from '@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'
import { colors, fontSize } from './src/constants/tokens'
import HomeStack from './src/screens/home/HomeStack'
import PlaylistStack from './src/screens/playlist/PlaylistStack'
import SongStack from './src/screens/song/SongStack'
import UserScreen from './src/screens/user/UserScreen'

const Tab = createBottomTabNavigator()

function BottomTabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarLabelStyle: {
					fontSize: fontSize.xs,
					fontWeight: 500,
				},
				headerShown: false,
				tabBarStyle: {
					height: 60,
					position: 'absolute',
					borderTopLeftRadius: 16,
					borderTopRightRadius: 16,
					borderTopWidth: 0,
					paddingTop: 8,
					paddingBottom: 8,
				},
				tabBarBackground: () => (
					<BlurView
						intensity={20}
						style={{
							...StyleSheet.absoluteFillObject,
							overflow: 'hidden',
							borderTopLeftRadius: 16,
							borderTopRightRadius: 16,
							backgroundColor: `${colors.background}`,
						}}
					/>
				),
			}}
		>
			<Tab.Screen
				name="home"
				component={HomeStack}
				options={{
					tabBarLabel: 'Trang chủ',
					headerShown: false,
					tabBarIcon: ({ color }) => <Ionicons name="home" size={20} color={color} />,
				}}
			/>
			<Tab.Screen
				name="playlist"
				component={PlaylistStack}
				options={{
					tabBarLabel: 'Playlists',
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="playlist-play" size={28} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="song"
				component={SongStack}
				options={{
					tabBarLabel: 'Bài hát',
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<Ionicons name="musical-notes-sharp" size={24} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="user"
				component={UserScreen}
				options={{
					title: 'Cá nhân',
					tabBarIcon: ({ color }) => <FontAwesome6 name="user" size={20} color={color} />,
				}}
			/>
		</Tab.Navigator>
	)
}

const Stack = createNativeStackNavigator()

function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> */}
				<Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
