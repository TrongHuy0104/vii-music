import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import TrackPlayer from 'react-native-track-player'
import { Provider } from 'react-redux'
import { useLogTrackPlayerState } from './src/hooks/useLogTrackPlayer'
import { useSetupTrackPlayer } from './src/hooks/useSetupTrackPlayer'
import store from './src/utils/store'
import { toastConfig } from './src/utils/toast'
import Navigation from './StackNavigator'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
			retry: false,
		},
	},
})

SplashScreen.preventAutoHideAsync()

const App = () => {
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])

	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoaded,
	})

	useLogTrackPlayerState()
	useEffect(() => {
		return () => {
			try {
				TrackPlayer.reset()
			} catch (error) {
				console.log(error)
			}
		}
	}, [])

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<Navigation />
					<StatusBar style="auto" />
				</GestureHandlerRootView>
			</QueryClientProvider>
			<Toast config={toastConfig} />
		</Provider>
	)
}

export default App
