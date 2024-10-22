import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import createBottomTabNavigator from '@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BlurView } from 'expo-blur'
import { Platform, StyleSheet, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { FloatingPlayer } from './src/components/FloatingPlayer'
import { colors, fontSize } from './src/constants/tokens'
import FavoriteStack from './src/screens/favorite/FavoriteStack'
import HomeStack from './src/screens/home/HomeStack'
import LoginScreen from './src/screens/LoginScreen'
import PlayerScreen from './src/screens/PlayerScreen'
import PlaylistStack from './src/screens/playlist/PlaylistStack'
import RegisterScreen from './src/screens/RegisterScreen'
import UserStack from './src/screens/user/UserStack'
import { useAuth } from './src/services/auth/useAuth'
import { navigationRef } from './src/utils/rootNavigation'

const SafeAreaWrapper = ({ children, safeArea = true }) => {
	return safeArea ? (
		<SafeAreaView style={styles.droidSafeArea}>
			<SafeAreaProvider>{children}</SafeAreaProvider>
		</SafeAreaView>
	) : (
		<View style={{ flex: 1 }}>{children}</View>
	)
}

const Tab = createBottomTabNavigator()

function BottomTabs() {
	return (
		<>
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
					name="favorite"
					component={FavoriteStack}
					options={{
						tabBarLabel: 'Yêu thích',
						headerShown: false,
						tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
					}}
				/>
				<Tab.Screen
					name="user"
					component={UserStack}
					options={{
						title: 'Cá nhân',
						tabBarIcon: ({ color }) => <FontAwesome6 name="user" size={20} color={color} />,
					}}
				/>
			</Tab.Navigator>
			<FloatingPlayer />
		</>
	)
}

const Stack = createNativeStackNavigator()

function Navigation() {
	const { session } = useAuth()

	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator>
				{!session ? (
					<>
						<Stack.Screen
							name="Login"
							component={() => (
								<SafeAreaWrapper safeArea={false}>
									<LoginScreen />
								</SafeAreaWrapper>
							)}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Register"
							component={() => (
								<SafeAreaWrapper safeArea={false}>
									<RegisterScreen />
								</SafeAreaWrapper>
							)}
							options={{ headerShown: false }}
						/>
					</>
				) : (
					<>
						<Stack.Screen
							name="Main"
							component={() => (
								<SafeAreaWrapper>
									<BottomTabs />
								</SafeAreaWrapper>
							)}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Login"
							component={() => (
								<SafeAreaWrapper safeArea={false}>
									<LoginScreen />
								</SafeAreaWrapper>
							)}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Register"
							component={() => (
								<SafeAreaWrapper safeArea={false}>
									<RegisterScreen />
								</SafeAreaWrapper>
							)}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Player"
							component={() => (
								<SafeAreaWrapper>
									<PlayerScreen />
								</SafeAreaWrapper>
							)}
							options={{
								headerShown: false,
								presentation: 'modal', // For modal-like behavior
								gestureEnabled: true,
								gestureDirection: 'default', // Vertical swipe gesture
								animationDuration: 400,
							}}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	droidSafeArea: {
		flex: 1,
		backgroundColor: `${colors.background}`,
		paddingTop: Platform.OS === 'android' ? 15 : 0,
	},
})

export default Navigation
