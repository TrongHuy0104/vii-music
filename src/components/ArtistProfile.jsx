// import React from 'react'
// import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
// import useDetailArtist from '../services/home/useArtistProfile' // Import hook mới mà bạn đã tạo
// import { defaultStyles } from '../styles' // Nếu bạn có file styles chung
// import { LinearGradient } from 'expo-linear-gradient';

// const { width } = Dimensions.get('window')

// const ArtistProfile = ({ artistName }) => {
// 	// Gọi hook để lấy thông tin artist
// 	const { isLoadingArtist, artist } = useDetailArtist(artistName)

// 	// Log để kiểm tra dữ liệu
// 	console.log('Artist data:', artist)
// 	const biographyy = artist?.biography?.replace(/<br\s*\/?>/gi, '\n') //remove <br> tag

// 	// Hiển thị loader nếu đang tải dữ liệu
// 	if (isLoadingArtist) {
// 		return <ActivityIndicator size="large" color="#6200EA" />
// 	}

// 	return (
// 		<ScrollView contentContainerStyle={defaultStyles.container}>
// 			{/* Header Section */}
// 			<View style={styles.header}>
// 				<Image
// 					source={{ uri: artist?.thumbnail || 'https://fallback-url.com/default.jpg' }} // Sử dụng ảnh bìa của nghệ sĩ hoặc ảnh dự phòng
// 					style={styles.artistImage}
// 				/>
// 				<LinearGradient
//           colors={['transparent', 'rgba(0,0,0,0.7)']} // Gradient trong suốt đến đen mờ
//           style={styles.gradient}
//         >

// 				<Text style={styles.artistName}>{artist?.name}</Text>
// 				<Text style={styles.fansCount}>{artist?.totalFollow} quan tâm</Text>
// 		</LinearGradient>

// 				{/* Bạn có thể bật phần này nếu muốn */}
// 				{/* <View style={styles.buttonsContainer}>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>QUAN TÂM</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.playButton}>
//             <Text style={styles.playButtonText}>PHÁT NHẠC</Text>
//           </TouchableOpacity>
//         </View> */}
// 			</View>

// 			{/* Featured Songs Section */}
// 			{/* <View style={styles.songList}>
// 				<Text style={styles.sectionTitle}>Bài Hát Nổi Bật</Text>
// 				{artist?.songs?.length > 0 ? (
// 					artist.songs.map((song, index) => (
// 						<TouchableOpacity key={index} style={styles.songItem}>
// 							<Text style={styles.songName}>{song.name}</Text>
// 							<Text style={styles.artistName}>{artist?.name}</Text>
// 						</TouchableOpacity>
// 					))
// 				) : (
// 					<Text>Không có bài hát nổi bật</Text>
// 				)}
// 			</View> */}

// 			{/* Additional Information Section */}
// 			<View style={styles.additionalInfo}>
// 				<Text style={styles.sectionTitle}>Thông tin</Text>
// 				<Text style={styles.infoText}>Tên thật: {artist?.realname || 'Không rõ'}</Text>
// 				<Text style={styles.infoText}>Ngày sinh: {artist?.birthday || 'Không rõ'}</Text>
// 				<Text style={styles.infoText}>Quốc gia: {artist?.national || 'Không rõ'}</Text>
// 				<Text style={styles.infoText}>Thể loại: {artist?.genre || 'Không rõ'}</Text>
// 				<Text style={styles.bioText}>{biographyy || 'Không có tiểu sử'}</Text>
// 			</View>
// 		</ScrollView>
// 	)
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},

// 	header: {
// 		alignItems: 'center',
// 		padding: 20,
// 	},
// 	artistImage: {
// 		width: 200,
// 		height: 200,
// 		borderRadius: 100,
// 	},
// 	artistName: {
// 		fontSize: 24,
// 		fontWeight: 'bold',
// 		color: '#fff',
// 		marginVertical: 10,
// 	},
// 	fansCount: {
// 		fontSize: 16,
// 		color: '#ccc',
// 	},
// 	buttonsContainer: {
// 		flexDirection: 'row',
// 		marginTop: 20,
// 	},
// 	button: {
// 		backgroundColor: '#444',
// 		paddingVertical: 10,
// 		paddingHorizontal: 20,
// 		borderRadius: 5,
// 		marginRight: 10,
// 	},
// 	buttonText: {
// 		color: '#fff',
// 		fontWeight: 'bold',
// 	},
// 	playButton: {
// 		backgroundColor: '#6200EA',
// 		paddingVertical: 10,
// 		paddingHorizontal: 20,
// 		borderRadius: 5,
// 	},
// 	playButtonText: {
// 		color: '#fff',
// 		fontWeight: 'bold',
// 	},
// 	songList: {
// 		paddingHorizontal: 20,
// 		marginTop: 20,
// 	},
// 	sectionTitle: {
// 		fontSize: 18,
// 		fontWeight: 'bold',
// 		color: '#fff',
// 		marginBottom: 10,
// 	},
// 	songItem: {
// 		paddingVertical: 10,
// 		borderBottomWidth: 1,
// 		borderBottomColor: '#333',
// 	},
// 	songName: {
// 		fontSize: 16,
// 		color: '#fff',
// 	},
// 	additionalInfo: {
// 		paddingHorizontal: 20,
// 		marginTop: 20,
// 	},
// 	infoText: {
// 		fontSize: 16,
// 		color: '#ccc',
// 		marginBottom: 5,
// 	},
// 	bioText: {
// 		fontSize: 14,
// 		color: '#aaa',
// 		marginTop: 10,
// 	},
// })

// export default ArtistProfile
import { LinearGradient } from 'expo-linear-gradient' // Gradient từ expo-linear-gradient
import React from 'react'
import {
	ActivityIndicator,
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import useDetailArtist from '../services/home/useArtistProfile' // Import hook để lấy thông tin artist

const { width } = Dimensions.get('window') // Lấy kích thước màn hình

const ArtistProfile = ({ artistName }) => {
	// Sử dụng hook để lấy dữ liệu về nghệ sĩ
	const { isLoadingArtist, artist } = useDetailArtist(artistName)

	// Log dữ liệu để kiểm tra
	console.log('Artist data:', artist)

	// Xử lý đoạn tiểu sử để bỏ các thẻ <br>
	const biographyy = artist?.biography?.replace(/<br\s*\/?>/gi, '\n')

	// Hiển thị spinner nếu đang tải dữ liệu
	if (isLoadingArtist) {
		return <ActivityIndicator size="large" color="#6200EA" />
	}

	return (
		<ScrollView contentContainerStyle={[{ flexGrow: 1, minHeight: '100%' }]}>
			{/* Phần đầu - ảnh nghệ sĩ và thông tin */}
			<View style={styles.header}>
				<Image
					source={{ uri: artist?.thumbnail || 'https://fallback-url.com/default.jpg' }} // Ảnh nghệ sĩ hoặc ảnh dự phòng
					style={[styles.artistImage, { width: width }]} // Đặt width ảnh dựa trên kích thước màn hình
				/>
				<LinearGradient
					colors={['transparent', 'rgba(0,0,0,0.8)']} // Gradient từ trong suốt đến đen mờ
					style={styles.gradient}
				>
					<Text style={styles.artistName}>{artist?.name}</Text>
					<Text style={styles.fansCount}>{artist?.totalFollow} quan tâm</Text>
				</LinearGradient>
			</View>

			{/* Phần thông tin bổ sung */}
			<View style={styles.additionalInfo}>
				<Text style={styles.sectionTitle}>Thông tin</Text>
				<Text style={styles.infoText}>Tên thật: {artist?.realname || 'Không rõ'}</Text>
				<Text style={styles.infoText}>Ngày sinh: {artist?.birthday || 'Không rõ'}</Text>
				<Text style={styles.infoText}>Quốc gia: {artist?.national || 'Không rõ'}</Text>
				<Text style={styles.infoText}>Thể loại: {artist?.genre || 'Không rõ'}</Text>
				<Text style={styles.bioText}>{biographyy || 'Không có tiểu sử'}</Text>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, // Đặt flex để kéo dãn nội dung cho phù hợp với màn hình
	},
	header: {
		position: 'relative', // Để LinearGradient nằm trên ảnh
		alignItems: 'center',
	},
	artistImage: {
		height: width, // Chiều cao của ảnh bằng chiều rộng của màn hình
		resizeMode: 'cover', // Đảm bảo ảnh được hiển thị đầy đủ
		width: width,
	},
	gradient: {
		position: 'absolute',
		bottom: 0, // Đặt Gradient ở dưới cùng của ảnh
		width: width,
		paddingVertical: 20,
		alignItems: 'center',
	},
	artistName: {
		fontSize: 28,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 5,
	},
	fansCount: {
		fontSize: 18,
		color: '#cdcdcd',
	},
	additionalInfo: {
		paddingHorizontal: 10,
		marginTop: 20,
		paddingBottom: 20,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 10,
	},
	infoText: {
		fontSize: 16,
		color: '#ccc',
		marginBottom: 5,
	},
	bioText: {
		fontSize: 14,
		color: '#aaa',
		marginTop: 10,
	},
})

export default ArtistProfile
