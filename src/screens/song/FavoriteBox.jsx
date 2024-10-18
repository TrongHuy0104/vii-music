import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fontSize } from '../../constants/tokens'

const FavoriteBox = ({ navigation }) => {
	const [isFavorite, setIsFavorite] = useState(false)
	const [favoriteSongsCount, setFavoriteSongsCount] = useState(5)
	const favoriteSongs = [
		{ id: 1, title: 'Bài hát 1', artist: 'Nghệ sĩ 1' },
		{ id: 2, title: 'Bài hát 2', artist: 'Nghệ sĩ 2' },
		{ id: 3, title: 'Bài hát 3', artist: 'Nghệ sĩ 3' },
		{ id: 4, title: 'Bài hát 4', artist: 'Nghệ sĩ 4' },
		{ id: 5, title: 'Bài hát 5', artist: 'Nghệ sĩ 5' },
	]

	const handlePress = () => {
		setIsFavorite(!isFavorite)
		navigation.navigate('FavoriteSongs', { favoriteSongs })
	}

	return (
		<View style={styles.favoriteContainer}>
			<TouchableOpacity style={styles.favoriteBox} onPress={handlePress}>
				<MaterialIcons
					name={isFavorite ? 'favorite' : 'favorite-border'}
					size={45}
					style={styles.icon}
					color={isFavorite ? '#00CCCC' : '#00CCCC'}
				/>
				<Text style={styles.favoriteText}>Yêu thích</Text>
				<Text style={styles.songCount}>{favoriteSongsCount} bài hát</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	favoriteContainer: {
		marginTop: 20,
		marginLeft: 20,
	},
	favoriteBox: {
		width: 120,
		height: 120,
		backgroundColor: '#ccc',
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 5,
		paddingLeft: 15,
	},
	favoriteText: {
		marginTop: 5,
		fontSize: fontSize.base,
	},
	icon: {
		marginBottom: 5,
	},
	songCount: {
		marginTop: 5,
		fontSize: 14,
		color: 'gray',
	},
})

export default FavoriteBox
