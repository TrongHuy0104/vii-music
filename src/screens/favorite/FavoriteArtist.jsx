import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ArtistItem from '../../components/ArtistItem'
import ArtistSuggestion from '../../components/ArtistSuggestion'
import { colors, fontSize, fontWeight } from '../../constants/tokens'

const FavoriteArtist = () => {
	const [artists, setArtists] = useState([
		{
			id: '1',
			name: 'Imagine Dragons',
			totalFollow: '79K',
			thumbnailM:
				'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/a/3/a/8/a3a8fd5fc61f1b5e582caeedd10ab03c.jpg',
			isFollow: true,
		},
		{
			id: '2',
			name: 'Vũ.',
			totalFollow: '135K',
			thumbnailM:
				'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/a/3/a/8/a3a8fd5fc61f1b5e582caeedd10ab03c.jpg',
			isFollow: true,
		},
		{
			id: '3',
			name: 'Jeff Danna & Mychael...',
			totalFollow: '2.6K',
			thumbnailM:
				'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/a/3/a/8/a3a8fd5fc61f1b5e582caeedd10ab03c.jpg',
			isFollow: false,
		},
		{
			id: '4',
			name: 'DEAMN',
			totalFollow: '98K',
			thumbnailM:
				'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/a/3/a/8/a3a8fd5fc61f1b5e582caeedd10ab03c.jpg',
			isFollow: false,
		},
		{
			id: '5',
			name: 'Alan Walker',
			totalFollow: '1.2M',
			thumbnailM:
				'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/a/3/a/8/a3a8fd5fc61f1b5e582caeedd10ab03c.jpg',
			isFollow: false,
		},
		{
			id: '6',
			name: 'Against The Current',
			totalFollow: '2K',
			thumbnailM:
				'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/a/3/a/8/a3a8fd5fc61f1b5e582caeedd10ab03c.jpg',
			isFollow: false,
		},
	])
	// Artist followed
	const followed = artists.filter((artist) => artist.isFollow)

	// Artist unfollow
	const suggestions = artists.filter((artist) => !artist.isFollow)

	const handleAddFavorite = (artist) => {
		setArtists((prevArtists) =>
			prevArtists.map((item) => (item.id === artist.id ? { ...item, isFollow: true } : item)),
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.headerTop}>
					<Text style={styles.headerTitle}>Nghệ sĩ</Text>
					<Text style={styles.subHeader}>{followed.length} nghệ sĩ • Đã quan tâm</Text>
				</View>
			</View>
			<View>
				<FlatList
					data={followed}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <ArtistItem artist={item} onAddArtist={handleAddFavorite} />}
				/>
			</View>
			{/* Component ArtistSuggestion */}
			<ArtistSuggestion suggestedArtists={suggestions} onAddArtist={handleAddFavorite} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 5,
		backgroundColor: colors.background,
	},
	sectionTitle: {
		fontSize: fontSize.base,
		fontWeight: fontWeight.medium,
		color: colors.text,
	},
	headerContainer: {
		backgroundColor: colors.background,
		paddingTop: 70,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	headerTop: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	headerTitle: {
		fontSize: fontSize.xl,
		fontWeight: fontWeight.bold,
		color: colors.text,
		padding: 10,
	},
	subHeader: {
		fontSize: fontSize.md,
		fontWeight: fontWeight.regular,
		color: colors.textMuted,
	},
})

export default FavoriteArtist
