import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Heading from '../../components/Heading'
import PlaylistThumb from '../../components/PlaylistThumb'
import TrackList from '../../components/TrackList'
import { colors, screenPadding } from '../../constants/tokens'
import useDetailPlaylist from '../../services/home/useDetailPlaylist'
import { defaultStyles } from '../../styles'
import { getInPremiumSongs, getInPremiumSongsDuration } from '../../utils/helpers'

// export default function SongListScreen({ route }) {
// 	const { encodeId } = route.params

// 	const { isLoadingPlaylist, playlists } = useDetailPlaylist(encodeId)

// 	if (isLoadingPlaylist)
// 		return (
// 			<View style={styles.container}>
// 				<Text>Loading...</Text>
// 			</View>
// 		)

// 	const { title, thumbnailM: thumbnail, song } = playlists
// 	const filterSongs = getInPremiumSongs(song.items)
// 	const filterSongsDuration = getInPremiumSongsDuration(filterSongs)
// 	return (
// 		<View style={styles.container}>
// 			<Heading title={title} />
// 			<ScrollView>
// 				<PlaylistThumb
// 					thumbnails={thumbnail}
// 					numSongs={filterSongs.length}
// 					duration={filterSongsDuration}
// 				/>
// 				<TrackList scrollEnabled={false} songs={filterSongs} id={encodeId} />
// 			</ScrollView>
// 		</View>
// 	)
// }

// const styles = StyleSheet.create({
// 	container: {
// 		...defaultStyles.container,
// 		paddingHorizontal: screenPadding.horizontal,
// 	},
// })
export default function SongListScreen({ route }) {
	const { encodeId } = route.params
	const { isLoadingPlaylist, playlists } = useDetailPlaylist(encodeId)

	if (isLoadingPlaylist)
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)

	const { title, thumbnailM: thumbnail, song } = playlists
	const filterSongs = getInPremiumSongs(song.items)
	const filterSongsDuration = getInPremiumSongsDuration(filterSongs)

	// Ensure thumbnail is always passed as an array
	const thumbnails = Array.isArray(thumbnail) ? thumbnail : [thumbnail];

	return (
		<View style={styles.container}>
			<Heading title={title} />
			<ScrollView>
				<PlaylistThumb
					thumbnails={thumbnails} // Pass array of thumbnails
					numSongs={filterSongs.length}
					duration={filterSongsDuration}
				/>
				<TrackList scrollEnabled={false} songs={filterSongs} id={encodeId} />
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
