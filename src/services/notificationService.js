import PushNotification from 'react-native-push-notification'

// Hàm gửi thông báo tải xuống thành công
export function sendDownloadSuccessNotification(trackTitle) {
	PushNotification.localNotification({
		channelId: 'download-channel', // Đảm bảo rằng channel này đã được tạo trong App.js
		title: 'Tải xuống hoàn tất',
		message: `${trackTitle} đã được tải xuống thành công!`,
	})
}
