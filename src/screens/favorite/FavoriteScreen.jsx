import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import TrackPlayer from 'react-native-track-player'
import Header from '../../components/Header'
import TrackListItem from '../../components/TrackListItem'
import { colors, screenPadding } from '../../constants/tokens'
import useFavoriteSongs from '../../services/song/useFavoriteSongs'
import { useQueue } from '../../store/queue'
import { defaultStyles, utilsStyles } from '../../styles'

export default function FavoriteScreen() {
	const { isLoadingFavoriteSongs, favoriteSongs } = useFavoriteSongs()
	const { activeQueueId, setActiveQueueId, setActiveTab } = useQueue()
	const queueOffset = useRef(0)

	const handleTrackSelect = async (selectedTrack) => {
		setActiveTab('favorite')
		const filterSongs = favoriteSongs.map((song) => song.Song)
		const trackIndex = filterSongs.findIndex((track) => track.url === selectedTrack.url)
		console.log('trackIndex', trackIndex)

		const id = 'favoriteId'
		const isChangingQueue = id !== activeQueueId
		console.log('isChangingQueue', isChangingQueue)
		if (isChangingQueue) {
			const beforeTracks = filterSongs.slice(0, trackIndex)
			const afterTracks = filterSongs.slice(trackIndex + 1)
			console.log('beforeTracks', afterTracks)

			await TrackPlayer.reset()

			// we construct the new queue
			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTracks)
			await TrackPlayer.add(beforeTracks)

			await TrackPlayer.play()

			queueOffset.current = trackIndex
			setActiveQueueId(id)
		} else {
			const nextTrackIndex =
				trackIndex - queueOffset.current < 0
					? filterSongs?.length + trackIndex - queueOffset.current
					: trackIndex - queueOffset.current
			console.log('nextTrackIndex', nextTrackIndex)

			await TrackPlayer.skip(nextTrackIndex)
			await TrackPlayer.play()
		}
	}

	const ItemDivider = () => (
		<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
	)

	if (isLoadingFavoriteSongs)
		return (
			<View style={styles.container}>
				<ActivityIndicator color={colors.icon} size={20} />
			</View>
		)
	return (
		<View style={defaultStyles.container}>
			<Header title="Yêu thích" />
			<ScrollView>
				<FlatList
					scrollEnabled={true}
					data={favoriteSongs}
					ItemSeparatorComponent={ItemDivider}
					ListFooterComponent={ItemDivider}
					renderItem={({ item: track }) => (
						<TrackListItem
							track={track.Song}
							onTrackSelect={handleTrackSelect}
							isInFavorite={true}
						/>
					)}
					keyExtractor={(item) => item.encodeId}
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 60 }}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
})
