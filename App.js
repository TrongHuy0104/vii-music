import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import PushNotification from 'react-native-push-notification'
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

	useEffect(() => {
		// Tạo Notification Channel cho Android
		PushNotification.createChannel(
			{
				channelId: 'download-channel',
				channelName: 'Download Notifications',
				importance: 4,
			},
			(created) => console.log(`createChannel returned '${created}'`),
		)

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

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { SplashScreen } from 'expo-router'
// import { StatusBar } from 'expo-status-bar'
// import { useCallback, useEffect } from 'react'
// import { GestureHandlerRootView } from 'react-native-gesture-handler'
// import Toast from 'react-native-toast-message'
// import TrackPlayer from 'react-native-track-player'
// import { Provider } from 'react-redux'
// import { useLogTrackPlayerState } from './src/hooks/useLogTrackPlayer'
// import { useSetupTrackPlayer } from './src/hooks/useSetupTrackPlayer'
// import store from './src/utils/store'
// import { toastConfig } from './src/utils/toast'
// import Navigation from './StackNavigator'

// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			staleTime: 0,
// 			retry: false,
// 		},
// 	},
// })

// SplashScreen.preventAutoHideAsync()

// const App = () => {
// 	const handleTrackPlayerLoaded = useCallback(() => {
// 		SplashScreen.hideAsync()
// 	}, [])

// 	useSetupTrackPlayer({
// 		onLoad: handleTrackPlayerLoaded,
// 	})

// 	useLogTrackPlayerState()
// 	useEffect(() => {
// 		return () => {
// 			try {
// 				TrackPlayer.reset()
// 			} catch (error) {
// 				console.log(error)
// 			}
// 		}
// 	}, [])

// 	return (
// 		<Provider store={store}>
// 			<QueryClientProvider client={queryClient}>
// 				<GestureHandlerRootView style={{ flex: 1 }}>
// 					<Navigation />
// 					<StatusBar style="auto" />
// 				</GestureHandlerRootView>
// 			</QueryClientProvider>
// 			<Toast config={toastConfig} />
// 		</Provider>
// 	)
// }

//push notification with firebase

// export default App
// import messaging from '@react-native-firebase/messaging'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { SplashScreen } from 'expo-router'
// import { StatusBar } from 'expo-status-bar'
// import { useCallback, useEffect } from 'react'
// import { GestureHandlerRootView } from 'react-native-gesture-handler'
// import PushNotification from 'react-native-push-notification'
// import Toast from 'react-native-toast-message'
// import TrackPlayer from 'react-native-track-player'
// import { Provider } from 'react-redux'
// import { useLogTrackPlayerState } from './src/hooks/useLogTrackPlayer'
// import { useSetupTrackPlayer } from './src/hooks/useSetupTrackPlayer'
// import store from './src/utils/store'
// import { toastConfig } from './src/utils/toast'
// import Navigation from './StackNavigator'

// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			staleTime: 0,
// 			retry: false,
// 		},
// 	},
// })

// SplashScreen.preventAutoHideAsync()

// const App = () => {
// 	const handleTrackPlayerLoaded = useCallback(() => {
// 		SplashScreen.hideAsync()
// 	}, [])

// 	useSetupTrackPlayer({
// 		onLoad: handleTrackPlayerLoaded,
// 	})

// 	useLogTrackPlayerState()

// 	useEffect(() => {
// 		// Request permission to send notifications
// 		const requestUserPermission = async () => {
// 			const authStatus = await messaging().requestPermission()
// 			const enabled =
// 				authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
// 				authStatus === messaging.AuthorizationStatus.PROVISIONAL

// 			if (enabled) {
// 				console.log('Authorization status:', authStatus)
// 			} else {
// 				console.log('Permission not granted', authStatus)
// 			}
// 		}

// 		// Gọi hàm để yêu cầu quyền thông báo
// 		requestUserPermission()

// 		// Lấy FCM Token
// 		messaging()
// 			.getToken()
// 			.then((token) => {
// 				console.log('FCM Token:', token)
// 			})
// 			.catch((error) => {
// 				console.log('Error getting FCM token:', error)
// 			})

// 		// Background message handler
// 		messaging().setBackgroundMessageHandler(async (remoteMessage) => {
// 			console.log('Message handled in the background!', remoteMessage)
// 		})

// 		// Foreground message handler
// 		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
// 			console.log('Foreground message received:', remoteMessage)
// 			PushNotification.localNotification({
// 				title: remoteMessage.notification.title,
// 				message: remoteMessage.notification.body,
// 			})
// 		})

// 		// Handle app opened from quit state due to notification
// 		messaging()
// 			.getInitialNotification()
// 			.then(async (remoteMessage) => {
// 				if (remoteMessage) {
// 					console.log(
// 						'Notification caused app to open from quit state:',
// 						remoteMessage.notification,
// 					)
// 				}
// 			})

// 		// Handle app opened from background due to notification
// 		messaging().onNotificationOpenedApp((remoteMessage) => {
// 			console.log(
// 				'Notification caused app to open from background state:',
// 				remoteMessage.notification,
// 			)
// 		})

// 		return () => {
// 			unsubscribe()
// 			try {
// 				TrackPlayer.reset()
// 			} catch (error) {
// 				console.log(error)
// 			}
// 		}
// 	}, [])

// 	return (
// 		<Provider store={store}>
// 			<QueryClientProvider client={queryClient}>
// 				<GestureHandlerRootView style={{ flex: 1 }}>
// 					<Navigation />
// 					<StatusBar style="auto" />
// 				</GestureHandlerRootView>
// 			</QueryClientProvider>
// 			<Toast config={toastConfig} />
// 		</Provider>
// 	)
// }

// export default App

// push notificat local
