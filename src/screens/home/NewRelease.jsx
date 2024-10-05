import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { fetchNewReleases } from '../../api/NewRelease'
import styles from '../../styles/NewReleaseStyles'

const NewRelease = () => {
	const [releases, setReleases] = useState([])
	const [loading, setLoading] = useState(true)
	const [showAll, setShowAll] = useState(false)
	const [filter, setFilter] = useState('all')

	useEffect(() => {
		const getReleases = async () => {
			const data = await fetchNewReleases()
			setReleases(data)
			setLoading(false)
		}
		getReleases()
	}, [])

	const filteredReleases = releases.filter((item) => {
		if (filter === 'all') return true
		if (filter === 'vietnam') return item.country !== 'VN'
		if (filter === 'international') return item.country === 'VN'
		return true
	})

	const renderItem = ({ item }) => (
		<View style={styles.item} key={item.encodeId}>
			<Image source={{ uri: item.thumbnail }} style={styles.albumCover} />
			<View style={styles.infoContainer}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.artist}>{item.artistsNames}</Text>
			</View>
		</View>
	)

	const chunkData = (arr, chunkSize) => {
		const chunks = []
		for (let i = 0; i < arr.length; i += chunkSize) {
			chunks.push(arr.slice(i, i + chunkSize))
		}
		return chunks
	}

	const rows = chunkData(filteredReleases, 3)

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Mới phát hành</Text>
				<TouchableOpacity onPress={() => setShowAll(!showAll)}>
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

			{loading ? (
				<ActivityIndicator size="medium" color="#0000ff" />
			) : (
				<FlatList
					data={rows.slice(0, showAll ? rows.length : 3)}
					renderItem={({ item }) => (
						<FlatList
							data={item}
							renderItem={renderItem}
							keyExtractor={(item) => item.encodeId}
							horizontal
							showsHorizontalScrollIndicator={false}
							style={styles.row}
						/>
					)}
					keyExtractor={(_, index) => index.toString()}
					showsVerticalScrollIndicator={false}
					horizontal
				/>
			)}
		</View>
	)
}

export default NewRelease
