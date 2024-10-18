import { useNavigationState } from '@react-navigation/native'
import React from 'react'
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { colors } from '../constants/tokens'

const CustomSafeAreaView = ({ children }) => {
	const state = useNavigationState((state) => state)

	// Check if state is available before accessing routes
	const routeName = state ? state.routes[state.index].name : null

	// List the screen names where you don't want SafeAreaView
	const screensWithoutSafeArea = ['Login']

	return (
		<View style={{ flex: 1 }}>
			{screensWithoutSafeArea.includes(routeName) ? (
				children
			) : (
				<SafeAreaView style={styles.droidSafeArea}>
					<SafeAreaProvider>{children}</SafeAreaProvider>
				</SafeAreaView>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	droidSafeArea: {
		flex: 1,
		backgroundColor: `${colors.background}`,
		paddingTop: Platform.OS === 'android' ? 15 : 0,
	},
})

export default CustomSafeAreaView
