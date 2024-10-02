import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { colors } from './src/constants/tokens'
import store from './src/utils/store'
import Navigation from './StackNavigator'

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
						<Navigation />
						<StatusBar style="auto" />
					</SafeAreaProvider>
				</SafeAreaView>
			</QueryClientProvider>
		</Provider>
	)
}

const styles = StyleSheet.create({
	droidSafeArea: {
		flex: 1,
		backgroundColor: `${colors.background}`,
		paddingTop: Platform.OS === 'android' ? 15 : 0,
	},
})

export default App
