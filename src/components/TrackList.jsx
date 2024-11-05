import React from 'react'
import { FlatList, View } from 'react-native'
import { storeStringData } from '../hooks/useAsyncStorage'
import { useQueue } from '../store/queue'
import { utilsStyles } from '../styles'
import TrackListItem from './TrackListItem'

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export default function TrackList({ scrollEnabled, songs, id }) {
	const { setActiveQueueId, setCurrentTrackId, setActiveTab } = useQueue()

	const handleTrackSelect = async (selectedTrack) => {
		setActiveTab('home')
		setActiveQueueId(id)
		setCurrentTrackId(selectedTrack.encodeId)
		console.log("Tracklist playlistid: ", id);
		// storeStringData(JSON.stringify(id), 'playlistId');
		storeStringData(id, 'playlistId');
		// if (activeTrack && activeTrack?.encodeId === selectedTrack.encodeId) return
		// const trackIndex = songs.findIndex((track) => track.encodeId === selectedTrack.encodeId)
		// const selectedAudio = await getSongAudio(songs[index])
		// const prevAudio = await getSongAudio(selectedTrack.encodeId)
		// const nextAudio = await getSongAudio(selectedTrack.encodeId)

		// await TrackPlayer.pause()
		// await TrackPlayer.load({ ...selectedTrack, url: selectedAudio.songAudio.data.data[128] })
		// await TrackPlayer.play()
	}

	return (
		<FlatList
			scrollEnabled={scrollEnabled}
			data={songs}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			keyExtractor={(item) => item.encodeId}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
		/>
	)
}
