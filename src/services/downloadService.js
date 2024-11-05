// src/services/downloadService.js
import { sendDownloadSuccessNotification } from './notificationService'

export async function downloadSong() {
	try {
		// Logic tải nhạc về
		console.log('Đang tải bài hát...')

		// Giả sử chúng ta có một hàm để xử lý việc tải về (giả lập với setTimeout)
		setTimeout(() => {
			console.log('Tải về thành công!')

			// Gọi hàm gửi thông báo khi tải về thành công
			sendDownloadSuccessNotification()
		}, 3000) // Thời gian tải giả lập 3 giây
	} catch (error) {
		console.error('Lỗi khi tải nhạc:', error)
	}
}
