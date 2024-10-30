// import { Image } from 'expo-image'
// import React from 'react'
// import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
// import { useActiveTrack } from 'react-native-track-player'
// import { unknownTrackImageUri } from '../constants/images'
// import { colors, fontSize } from '../constants/tokens'
// import { useTrackPlayerFavorite } from '../hooks/useTrackPlayerFavorite'
// import { defaultStyles } from '../styles'
// import FavoriteButton from './FavoriteButton'

// export default function TrackListItem({
// 	track,
// 	onTrackSelect: handleTrackSelect,
// 	isInFavorite = false,
// }) {
// 	const {
// 		isFavorite,
// 		isLoading: isLoadingFavorite,
// 		isLoadingAdd,
// 		toggleFavorite,
// 		isLoadingRemove,
// 	} = useTrackPlayerFavorite(track)
// 	const { title, thumbnailM, artistsNames } = track
// 	const isActiveTrack = useActiveTrack()?.encodeId === track.encodeId
// 	// if (isLoadingFavorite || isLoadingAdd || isLoadingRemove)
// 	// 	return (
// 	// 		<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
// 	// 			<ActivityIndicator color={colors.icon} />
// 	// 		</View>
// 	// 	)
// 	return (
// 		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
// 			<View style={styles.trackItemContainer}>
// 				{/* Track thumb */}
// 				<View>
// 					<Image
// 						style={{ ...styles.trackArtworkImage, opacity: isActiveTrack ? 0.6 : 1 }}
// 						source={thumbnailM}
// 						placeholder={unknownTrackImageUri}
// 						contentFit="cover"
// 						transition={1000}
// 					/>
// 				</View>
// 				{/* Tack title + artist */}

// 				<View
// 					style={{
// 						flex: 1,
// 						flexDirection: 'row',
// 						justifyContent: 'space-between',
// 						alignItems: 'center',
// 					}}
// 				>
// 					<View style={{ width: '90%', marginRight: 8 }}>
// 						<Text
// 							numberOfLines={1}
// 							style={{
// 								...styles.trackTitleText,
// 								color: isActiveTrack ? colors.primary : colors.text,
// 							}}
// 						>
// 							{title}
// 						</Text>
// 						{artistsNames && (
// 							<Text numberOfLines={1} style={styles.trackArtistText}>
// 								{artistsNames}
// 							</Text>
// 						)}
// 					</View>
// 					{isInFavorite && (
// 						<View>
// 							<FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
// 						</View>
// 					)}
// 				</View>
// 			</View>
// 		</TouchableHighlight>
// 	)
// }

// const styles = StyleSheet.create({
// 	trackItemContainer: {
// 		flexDirection: 'row',
// 		columnGap: 14,
// 		alignItems: 'center',
// 		paddingRight: 20,
// 	},
// 	trackArtworkImage: {
// 		borderRadius: 8,
// 		width: 50,
// 		height: 50,
// 	},
// 	trackTitleText: {
// 		...defaultStyles.text,
// 		fontSize: fontSize.sm,
// 		fontWeight: '600',
// 	},
// 	trackArtistText: {
// 		...defaultStyles.text,
// 		color: colors.textMuted,
// 		fontSize: 14,
// 		marginTop: 4,
// 	},
// })
// import { FontAwesome } from '@expo/vector-icons'
// import * as FileSystem from 'expo-file-system'
// import { Image } from 'expo-image'
// import React from 'react'
// import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
// import Toast from 'react-native-toast-message'
// import { useActiveTrack } from 'react-native-track-player'
// import { getSongAudio } from '../api'; // Import your getSongAudio function
// import { unknownTrackImageUri } from '../constants/images'
// import { colors, fontSize } from '../constants/tokens'
// import { useTrackPlayerFavorite } from '../hooks/useTrackPlayerFavorite'
// import { defaultStyles } from '../styles'
// import FavoriteButton from './FavoriteButton'

// export default function TrackListItem({
// 	track,
// 	onTrackSelect: handleTrackSelect,
// 	isInFavorite = false,
// }) {
// 	const {
// 		isFavorite,
// 		isLoading: isLoadingFavorite,
// 		isLoadingAdd,
// 		toggleFavorite,
// 		isLoadingRemove,
// 	} = useTrackPlayerFavorite(track)

// 	const { title, thumbnailM, artistsNames } = track
// 	const isActiveTrack = useActiveTrack()?.encodeId === track.encodeId

// 	// Download track function with `getSongAudio`
// 	const handleDownload = async (track) => {
// 		try {
// 			// Fetch the song audio using the provided getSongAudio function
// 			const { songAudio } = await getSongAudio(track.encodeId)

// 			// Check if the audio URL is available
// 			console.log(songAudio?.data?.['128']);

// 			const audioUrl = "https://a128-z3.zmdcdn.me/40f2b0434a2a3c5cab81da9d257220ba?authen=exp=1729796151~acl=/40f2b0434a2a3c5cab81da9d257220ba*~hmac=98f52ab76608c0e59393c804cc138580"
// 			if (!audioUrl) {
// 				Toast.show({
// 					type: 'error',
// 					text1: 'Download Error',
// 					text2: 'The audio file is not available for download.',
// 				})
// 				return
// 			}

// 			// Check if the track has download restrictions
// 			if (track.downloadPrivileges && track.downloadPrivileges.includes(3)) {
// 				Toast.show({
// 					type: 'error',
// 					text1: 'Download Error',
// 					text2: 'This track is not available for download due to restrictions.',
// 				})
// 				return
// 			}

// 			// Proceed with downloading the song
// 			const downloadResumable = FileSystem.createDownloadResumable(
// 				audioUrl,
// 				FileSystem.documentDirectory + `${track.title}.mp3`
// 			)
// 			const { uri } = await downloadResumable.downloadAsync()
// 			console.log('Downloaded to:', uri)

// 			Toast.show({
// 				type: 'success',
// 				text1: 'Download Complete',
// 				text2: `Track downloaded to: ${uri}`,
// 			})
// 		} catch (error) {
// 			console.error('Error downloading the song:', error)

// 			Toast.show({
// 				type: 'error',
// 				text1: 'Download Error',
// 				text2: 'An error occurred while downloading the track.',
// 			})
// 		}
// 	}

// 	return (
// 		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
// 			<View style={styles.trackItemContainer}>
// 				{/* Track thumb */}
// 				<View>
// 					<Image
// 						style={{ ...styles.trackArtworkImage, opacity: isActiveTrack ? 0.6 : 1 }}
// 						source={thumbnailM}
// 						placeholder={unknownTrackImageUri}
// 						contentFit="cover"
// 						transition={1000}
// 					/>
// 				</View>

// 				<View
// 					style={{
// 						flex: 1,
// 						flexDirection: 'row',
// 						justifyContent: 'space-between',
// 						alignItems: 'center',
// 					}}
// 				>
// 					<View style={{ width: '70%', marginRight: 8 }}>
// 						<Text
// 							numberOfLines={1}
// 							style={{
// 								...styles.trackTitleText,
// 								color: isActiveTrack ? colors.primary : colors.text,
// 							}}
// 						>
// 							{title}
// 						</Text>
// 						{artistsNames && (
// 							<Text numberOfLines={1} style={styles.trackArtistText}>
// 								{artistsNames}
// 							</Text>
// 						)}
// 					</View>

// 					{/* Favorite Button */}
// 					{isInFavorite && (
// 						<View>
// 							<FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
// 						</View>
// 					)}

// 					{/* Download Button */}
// 					<TouchableOpacity onPress={() => handleDownload(track)} style={styles.downloadButton}>
// 						<FontAwesome name="download" size={24} color={colors.icon} />
// 					</TouchableOpacity>

// 				</View>
// 			</View>
// 		</TouchableHighlight>
// 	)
// }

// const styles = StyleSheet.create({
// 	trackItemContainer: {
// 		flexDirection: 'row',
// 		columnGap: 14,
// 		alignItems: 'center',
// 		paddingRight: 20,
// 	},
// 	trackArtworkImage: {
// 		borderRadius: 8,
// 		width: 50,
// 		height: 50,
// 	},
// 	trackTitleText: {
// 		...defaultStyles.text,
// 		fontSize: fontSize.sm,
// 		fontWeight: '600',
// 	},
// 	trackArtistText: {
// 		...defaultStyles.text,
// 		color: colors.textMuted,
// 		fontSize: 14,
// 		marginTop: 4,
// 	},
// 	downloadButton: {
// 		padding: 10,
// 	},
// })
import { FontAwesome } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useActiveTrack } from 'react-native-track-player'
import { getSongAudio } from '../api'
import { unknownTrackImageUri } from '../constants/images'
import { colors, fontSize } from '../constants/tokens'
import { useTrackPlayerFavorite } from '../hooks/useTrackPlayerFavorite'
import { defaultStyles } from '../styles'
import FavoriteButton from './FavoriteButton'

export default function TrackListItem({
	track,
	onTrackSelect: handleTrackSelect,
	isInFavorite = false,
}) {
	const {
		isFavorite,
		isLoading: isLoadingFavorite,
		isLoadingAdd,
		toggleFavorite,
		isLoadingRemove,
	} = useTrackPlayerFavorite(track)

	const { title, thumbnailM, artistsNames } = track
	const isActiveTrack = useActiveTrack()?.encodeId === track.encodeId

	// Download track function with `getSongAudio`
	const handleDownload = async (track) => {
		try {
			// Fetch the song audio using the provided getSongAudio function
			const { songAudio } = await getSongAudio(track.encodeId)
			console.log('audio', songAudio?.data?.['128']);

			// Check if the audio URL is available
			const audioUrl = songAudio?.data;
			if (!audioUrl) {
				Toast.show({
					type: 'error',
					text1: 'Download Error',
					text2: 'The audio file is not available for download.',
				})
				return
			}

			// Proceed with downloading the song
			const audioDownloadResumable = FileSystem.createDownloadResumable(
				audioUrl,
				FileSystem.documentDirectory + `${track.title}.mp3`
			)
			const { uri: audioUri } = await audioDownloadResumable.downloadAsync()

			// Download the thumbnail
			const thumbnailUri = track.thumbnailM || unknownTrackImageUri
			const imageDownloadResumable = FileSystem.createDownloadResumable(
				thumbnailUri,
				FileSystem.documentDirectory + `${track.title}.jpg`
			)
			const { uri: imageUri } = await imageDownloadResumable.downloadAsync()

			Toast.show({
				type: 'success',
				text1: 'Download Complete',
				text2: `Track and thumbnail downloaded successfully!`,
			})

			console.log('Audio downloaded to:', audioUri)
			console.log('Thumbnail downloaded to:', imageUri)

		} catch (error) {
			console.error('Error downloading the song or thumbnail:', error)

			Toast.show({
				type: 'error',
				text1: 'Download Error',
				text2: 'An error occurred while downloading the track or its thumbnail.',
			})
		}
	}

	return (
		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
			<View style={styles.trackItemContainer}>
				{/* Track thumb */}
				<View>
					<Image
						style={{ ...styles.trackArtworkImage, opacity: isActiveTrack ? 0.6 : 1 }}
						source={thumbnailM}
						placeholder={unknownTrackImageUri}
						contentFit="cover"
						transition={1000}
					/>
				</View>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{ width: '70%', marginRight: 8 }}>
						<Text
							numberOfLines={1}
							style={{
								...styles.trackTitleText,
								color: isActiveTrack ? colors.primary : colors.text,
							}}
						>
							{title}
						</Text>
						{artistsNames && (
							<Text numberOfLines={1} style={styles.trackArtistText}>
								{artistsNames}
							</Text>
						)}
					</View>

					{/* Favorite Button */}
					{isInFavorite && (
						<View>
							<FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
						</View>
					)}

					{/* Download Button */}
					<TouchableOpacity onPress={() => handleDownload(track)} style={styles.downloadButton}>
						<FontAwesome name="download" size={24} color={colors.icon} />
					</TouchableOpacity>

				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
	downloadButton: {
		padding: 10,
	},
})
