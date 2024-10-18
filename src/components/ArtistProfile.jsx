import React from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import useDetailArtist from '../services/home/useArtistProfile' // Import hook mới mà bạn đã tạo
import { defaultStyles } from '../styles' // Nếu bạn có file styles chung

const ArtistProfile = ({ artistName }) => {
	// Gọi hook để lấy thông tin artist
	const { isLoadingArtist, artist } = useDetailArtist(artistName)

	// Log để kiểm tra dữ liệu
	console.log('Artist data:', artist)
	const biographyy = artist?.biography?.replace(/<br\s*\/?>/gi, '\n') //remove <br> tag

	// Hiển thị loader nếu đang tải dữ liệu
	if (isLoadingArtist) {
		return <ActivityIndicator size="large" color="#6200EA" />
	}

	return (
		<ScrollView contentContainerStyle={defaultStyles.container}>
			{/* Header Section */}
			<View style={styles.header}>
				<Image
					source={{ uri: artist?.thumbnail || 'https://fallback-url.com/default.jpg' }} // Sử dụng ảnh bìa của nghệ sĩ hoặc ảnh dự phòng
					style={styles.artistImage}
				/>
				<Text style={styles.artistName}>{artist?.name}</Text>
				<Text style={styles.fansCount}>{artist?.totalFollow} quan tâm</Text>

				{/* Bạn có thể bật phần này nếu muốn */}
				{/* <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>QUAN TÂM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton}>
            <Text style={styles.playButtonText}>PHÁT NHẠC</Text>
          </TouchableOpacity>
        </View> */}
			</View>

			{/* Featured Songs Section */}
			{/* <View style={styles.songList}>
				<Text style={styles.sectionTitle}>Bài Hát Nổi Bật</Text>
				{artist?.songs?.length > 0 ? (
					artist.songs.map((song, index) => (
						<TouchableOpacity key={index} style={styles.songItem}>
							<Text style={styles.songName}>{song.name}</Text>
							<Text style={styles.artistName}>{artist?.name}</Text>
						</TouchableOpacity>
					))
				) : (
					<Text>Không có bài hát nổi bật</Text>
				)}
			</View> */}

			{/* Additional Information Section */}
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
		flex: 1,
	},

	header: {
		alignItems: 'center',
		padding: 20,
	},
	artistImage: {
		width: 200,
		height: 200,
		borderRadius: 100,
	},
	artistName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
		marginVertical: 10,
	},
	fansCount: {
		fontSize: 16,
		color: '#ccc',
	},
	buttonsContainer: {
		flexDirection: 'row',
		marginTop: 20,
	},
	button: {
		backgroundColor: '#444',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginRight: 10,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	playButton: {
		backgroundColor: '#6200EA',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	playButtonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	songList: {
		paddingHorizontal: 20,
		marginTop: 20,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 10,
	},
	songItem: {
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#333',
	},
	songName: {
		fontSize: 16,
		color: '#fff',
	},
	additionalInfo: {
		paddingHorizontal: 20,
		marginTop: 20,
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
