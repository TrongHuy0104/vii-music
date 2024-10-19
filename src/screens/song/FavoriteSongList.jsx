import { MaterialIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import {
	FlatList,
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import Heading from '../../components/Heading'
import { colors, fontSize, screenPadding } from '../../constants/tokens'
import { defaultStyles } from '../../styles'

const FavoriteSongList = () => {
	const route = useRoute()
	const { favoriteSongs } = route.params

	const [modalVisible, setModalVisible] = useState(false)
	const [selectedSong, setSelectedSong] = useState(null)

	const openConfirmationModal = (song) => {
		setSelectedSong(song)
		setModalVisible(true)
	}

	const handleRemoveSong = () => {
		if (selectedSong) {
			const updatedSongs = favoriteSongs.filter((song) => song.id !== selectedSong.id)
			route.params.favoriteSongs = updatedSongs
			setModalVisible(false)
			setSelectedSong(null)
		}
	}

	return (
		<View style={styles.container}>
			<Heading />
			<Text style={styles.head}>Bài hát yêu thích</Text>
			<Text style={styles.countSong}>{favoriteSongs.length} bài hát</Text>

			<FlatList
				data={favoriteSongs}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={styles.item}>
						<Image
							source={{
								uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJkxpiJd9zk2SuRpU--HcRctheHF5rcLq8A&s',
							}}
							style={styles.albumCover}
						/>
						<View style={styles.infoContainer}>
							<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
								{item.title}
							</Text>
							<Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">
								{item.artist}
							</Text>
						</View>
						<View style={styles.iconsContainer}>
							<TouchableOpacity onPress={() => openConfirmationModal(item)}>
								<MaterialIcons name="favorite" size={24} color="#00CCCC" />
							</TouchableOpacity>
							<TouchableOpacity>
								<MaterialIcons name="more-horiz" size={20} color={colors.text} />
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Xác nhận xóa</Text>
						<Text style={styles.modalMessage}>
							Bạn có chắc chắn muốn xóa bài hát "{selectedSong?.title}" khỏi danh sách yêu thích
							không?
						</Text>
						<View style={styles.modalButtons}>
							<Pressable style={styles.button} onPress={() => setModalVisible(false)}>
								<Text style={styles.buttonText}>Hủy</Text>
							</Pressable>
							<Pressable style={styles.button} onPress={handleRemoveSong}>
								<Text style={styles.buttonText}>Xóa</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
	head: {
		color: colors.text,
		fontSize: 20,
		textAlign: 'center',
	},
	countSong: {
		color: colors.text,
		fontSize: fontSize.base,
		textAlign: 'center',
	},
	item: {
		flexDirection: 'row',
		marginVertical: 8,
		paddingVertical: 5,
		alignItems: 'center',
		borderRadius: 8,
		paddingHorizontal: 10,
	},
	albumCover: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginRight: 10,
	},
	infoContainer: {
		flex: 1,
	},
	title: {
		fontSize: fontSize.sm,
		fontWeight: 'bold',
		color: colors.text,
	},
	artist: {
		fontSize: fontSize.sm,
		color: 'grey',
	},
	iconsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		width: '80%',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	modalMessage: {
		fontSize: 16,
		marginBottom: 20,
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	button: {
		padding: 10,
		backgroundColor: colors.primary,
		borderRadius: 5,
		width: '40%',
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
})

export default FavoriteSongList
