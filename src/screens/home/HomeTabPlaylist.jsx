import React, { useEffect, useState } from 'react'
import {
	Dimensions,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

import HomePlaylist from './HomePlaylist'

const { width } = Dimensions.get('window')

const HomeTabPlaylist = ({ navigation, playlists }) => {
	const [activeTab, setActiveTab] = useState(playlists.length > 0 ? playlists[0].title : '')
	const activePlaylist = playlists.find((playlist) => playlist.title === activeTab)

	// Update activeTab when playlists are loaded
	useEffect(() => {
		if (playlists.length > 0 && !activeTab) {
			setActiveTab(playlists[0].title)
		}
	}, [playlists, activeTab])

	const handlePlaylistPress = (encodeId) => {
		// Navigate to Playlist screen, passing the encodeId
		navigation.navigate('SongList', { encodeId })
	}

	return (
		<View style={styles.container}>
			{/* Tabs Section */}
			<View style={styles.tabContainer}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.tabContent}
				>
					{playlists.map((item) => (
						<TouchableOpacity
							key={item.title}
							style={[styles.tab, activeTab === item.title && styles.activeTab]}
							onPress={() => setActiveTab(item.title)}
							activeOpacity={1}
						>
							<Text style={[styles.tabText, activeTab === item.title && styles.activeTabText]}>
								{item.title}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			{/* Playlist Section */}

			<View>
				{activePlaylist && (
					<FlatList
						data={activePlaylist.items}
						horizontal={true}
						keyExtractor={(item) => item.encodeId}
						renderItem={({ item }) => (
							<View style={styles.itemContainer}>
								<HomePlaylist
									playlistItem={item}
									onPress={() => handlePlaylistPress(item.encodeId)}
								/>
							</View>
						)}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.flatListContent}
					/>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabContainer: {
		flexDirection: 'row',
		paddingVertical: 10,
	},
	tabContent: {
		justifyContent: 'space-around',
	},
	tab: {
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	tabText: {
		fontSize: 16,
		color: '#ffffff',
	},
	activeTab: {
		borderBottomWidth: 2,
		borderBottomColor: '#24CEF0',
	},
	activeTabText: {
		color: '#24CEF0',
	},
	flatListContent: { height: 200 },
	itemContainer: {
		width: width / 2 - 16,
	},
})

export default HomeTabPlaylist
