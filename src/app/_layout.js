import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { colors } from '../constants/tokens'
import store from '../utils/store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
})

const App = () => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<SafeAreaView style={styles.droidSafeArea}>
					<SafeAreaProvider>
						<RootNavigation />
						<StatusBar style="auto" />
					</SafeAreaProvider>
				</SafeAreaView>
			</QueryClientProvider>
		</Provider>
	)
}

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} /> /
		</Stack>
	)
}

const styles = StyleSheet.create({
	droidSafeArea: {
		flex: 1,
		backgroundColor: `${colors.background}`,
		paddingTop: Platform.OS === 'android' ? 0 : 0,
	},
})

export default App
