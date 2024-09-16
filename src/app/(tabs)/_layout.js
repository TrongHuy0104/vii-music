import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import { colors, fontSize } from '../../constants/tokens'

const TabNavigation = () => {
	return (
		<Tabs
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
			<Tabs.Screen
				name="(home)"
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => <Ionicons name="home" size={20} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="playlists"
				options={{
					title: 'Playlists',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="playlist-play" size={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="song"
				options={{
					title: 'Song',
					tabBarIcon: ({ color }) => (
						<Ionicons name="musical-notes-sharp" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="user"
				options={{
					title: 'User',
					tabBarIcon: ({ color }) => <FontAwesome6 name="user" size={20} color={color} />,
				}}
			/>
		</Tabs>
	)
}

export default TabNavigation
