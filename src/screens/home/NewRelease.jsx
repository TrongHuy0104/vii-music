import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fontSize } from '../../constants/tokens'
import useHome from '../../services/home/useHome'

const NewRelease = ({ navigation, newreleases }) => {
	const { isLoading, newrealeases } = useHome()
	const [showAll, setShowAll] = useState(false)
	const [filter, setFilter] = useState('all')
	const handleNewReleaseList = () => {
		navigation.navigate('NewReleaseList', { newreleases }) // Pass new releases data
	}

	if (isLoading) {
		return <Text>Loading...</Text>
	}

	const filteredReleases = newrealeases.filter((item) => {
		if (filter === 'all') return true
		if (filter === 'vietnam') return item.country !== 'VN'
		if (filter === 'international') return item.country === 'VN'
		return true
	})

	const chunkData = (arr, chunkSize) => {
		const chunks = []
		for (let i = 0; i < arr.length; i += chunkSize) {
			chunks.push(arr.slice(i, i + chunkSize))
		}
		return chunks
	}

	const rows = chunkData(filteredReleases, 3)

	const renderItem = ({ item }) => (
		<View style={styles.item}>
			<Image source={{ uri: item.thumbnail }} style={styles.albumCover} />
			<View style={styles.infoContainer}>
				<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
					{item.title}
				</Text>
				<Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">
					{item.artistsNames}
				</Text>
			</View>
		</View>
	)

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Mới phát hành</Text>
				<TouchableOpacity onPress={(item) => handleNewReleaseList(item.encodeId)}>
					<Text style={styles.seeMore}>{showAll ? '<' : '>'}</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.filterContainer}>
				<TouchableOpacity onPress={() => setFilter('all')}>
					<Text style={[styles.filterButton, filter === 'all' && styles.activeFilter]}>Tất cả</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setFilter('vietnam')}>
					<Text style={[styles.filterButton, filter === 'vietnam' && styles.activeFilter]}>
						Việt Nam
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setFilter('international')}>
					<Text style={[styles.filterButton, filter === 'international' && styles.activeFilter]}>
						Quốc Tế
					</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={rows.slice(0, showAll ? rows.length : 3)}
				renderItem={({ item }) => (
					<FlatList
						data={item}
						renderItem={renderItem}
						keyExtractor={(item) => item.encodeId}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.row}
					/>
				)}
				keyExtractor={(_, index) => index.toString()}
				showsVerticalScrollIndicator={false}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	header: {
		fontSize: fontSize.base,
		color: colors.text,
	},
	seeMore: {
		fontSize: fontSize.base,
		marginLeft: 15,
		color: colors.text,
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	filterButton: {
		color: colors.text,
	},
	activeFilter: {
		color: '#33CCFF',
		fontWeight: 'bold',
	},
	row: {
		marginBottom: 5,
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		marginVertical: 8,
		paddingVertical: 5,
		paddingHorizontal: 5,
		alignItems: 'center',
		borderRadius: 8,
		marginRight: 10,
		height: 70,
		width: 'auto',
	},
	albumCover: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginRight: 5,
	},
	infoContainer: {
		flex: 1,
	},
	title: {
		fontSize: fontSize.base,
		fontWeight: 'bold',
		color: colors.text,
		maxWidth: '50%',
	},
	artist: {
		fontSize: fontSize.base,
		color: 'gray',
		maxWidth: '80%',
	},
})

export default NewRelease
