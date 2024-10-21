import PushNotification from 'react-native-push-notification'

// Tạo kênh thông báo cho Android
export const configurePushNotification = () => {
	PushNotification.createChannel(
		{
			channelId: 'default-channel-id', // Kênh cho Android
			channelName: 'Default channel',
			channelDescription: 'A channel to categorize your notifications',
			importance: 4, // Mức độ quan trọng của thông báo
			vibrate: true,
		},
		(created) => console.log(`createChannel returned '${created}'`),
	)

	PushNotification.configure({
		onRegister: function (token) {
			console.log('TOKEN:', token)
		},

		onNotification: function (notification) {
			console.log('NOTIFICATION:', notification)
			notification.finish(PushNotificationIOS.FetchResult.NoData)
		},

		permissions: {
			alert: true,
			badge: true,
			sound: true,
		},

		popInitialNotification: true,
		requestPermissions: true,
	})
}

// Gửi thông báo
export const sendLocalNotification = (title, message) => {
	PushNotification.localNotification({
		channelId: 'default-channel-id',
		title: title,
		message: message,
		playSound: true,
		soundName: 'default',
		importance: 'high',
		vibrate: true,
	})
}
