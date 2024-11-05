// src/services/notificationService.js
import PushNotification from 'react-native-push-notification'

// Hàm gửi thông báo tải xuống thành công
export function sendDownloadSuccessNotification() {
	PushNotification.localNotification({
		channelId: 'download-channel', // Đảm bảo rằng channel này đã được tạo
		title: 'Tải xuống hoàn tất',
		message: 'Bài hát của bạn đã được tải xuống thành công!',
	})
}
