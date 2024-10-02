import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Heading from '../../components/Heading'
import PlaylistThumb from '../../components/PlaylistThumb'
import TrackList from '../../components/TrackList'
import { screenPadding } from '../../constants/tokens'
import useDetailPlaylist from '../../services/home/useDetailPlaylist'
import { defaultStyles } from '../../styles'
import { getInPremiumSongs, getInPremiumSongsDuration } from '../../utils/helpers'

export default function SongListScreen() {
	const { isLoadingPlaylist, playlists } = useDetailPlaylist()

	if (isLoadingPlaylist)
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		)
	const { title, thumbnailM: thumbnail, song } = playlists
	const filterSongs = getInPremiumSongs(song.items)
	const filterSongsDuration = getInPremiumSongsDuration(filterSongs)
	return (
		<View style={styles.container}>
			<Heading title={title} />
			<ScrollView>
				<PlaylistThumb
					thumbnail={thumbnail}
					numSongs={filterSongs.length}
					duration={filterSongsDuration}
				/>
				<TrackList scrollEnabled={false} songs={filterSongs} />
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
