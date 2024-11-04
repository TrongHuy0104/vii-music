import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useActiveTrack } from 'react-native-track-player';
import FavoriteButton from '../components/FavoriteButton';
import Heading from '../components/Heading';
import { MovingText } from '../components/MovingText';
import { PlayerControls } from '../components/PlayerControls';
import { PlayerProgressBar } from '../components/PlayerProgressbar';
import { unknownTrackImageUri } from '../constants/images';
import { colors, fontSize, screenPadding } from '../constants/tokens';
import { getStringData } from '../hooks/useAsyncStorage';
import { usePlayerBackground } from '../hooks/usePlayerBackground';
import { useTrackPlayerFavorite } from '../hooks/useTrackPlayerFavorite';
import useDetailPlaylist from '../services/home/useDetailPlaylist';
import { defaultStyles } from '../styles';

export default function PlayerScreen() {
	const activeTrack = useActiveTrack();
	const [playlistsId, setPlaylistsId] = useState(null);
	const [loading, setLoading] = useState(true);

	const { playlists, isLoadingPlaylist } = useDetailPlaylist(playlistsId);
	const { bgImgColors } = usePlayerBackground(activeTrack?.thumbnailM ?? unknownTrackImageUri);
	const {
		isFavorite,
		isLoading: isLoadingFavorite,
		isLoadingAdd,
		toggleFavorite,
		isLoadingRemove,
	} = useTrackPlayerFavorite();

	useEffect(() => {
		const fetchPlaylistsId = async () => {
			try {
				const id = await getStringData('playlistId');
				setPlaylistsId(id);
			} catch (error) {
				console.error('Error fetching playlist ID:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPlaylistsId();
	}, []);

	const handleDownload = async () => {
		try {
			const audioDownloadResumable = FileSystem.createDownloadResumable(
				activeTrack.url,
				FileSystem.documentDirectory + `${activeTrack.title}.mp3`
			);
			const { uri: audioUri } = await audioDownloadResumable.downloadAsync();

			const thumbnailUri = activeTrack.thumbnailM || unknownTrackImageUri;
			const imageDownloadResumable = FileSystem.createDownloadResumable(
				thumbnailUri,
				FileSystem.documentDirectory + `${activeTrack.title}.jpg`
			);
			const { uri: downloadedThumbnailUri } = await imageDownloadResumable.downloadAsync();

			const metadata = {
				encodeId: activeTrack.id,
				title: activeTrack.title,
				audioUrl: audioUri,
				thumbnailUri: downloadedThumbnailUri,
				artistsNames: activeTrack.artistsNames,
			};
			await FileSystem.writeAsStringAsync(
				FileSystem.documentDirectory + `${activeTrack.title}.json`,
				JSON.stringify(metadata)
			);

			console.log("Metadata saved:", metadata);

			// Emit the event to refresh the downloaded songs list
			// downloadEventEmitter.emit('downloadComplete');

			Toast.show({
				type: 'success',
				text1: 'Download Complete',
				text2: 'Track and metadata saved successfully!',
			});
		} catch (error) {
			console.error('Error downloading:', error);
			Toast.show({
				type: 'error',
				text1: 'Download Error',
				text2: 'An error occurred while downloading the track or metadata.',
			});
		}
	};
	// const requestStoragePermission = async () => {
	// 	if (Platform.OS === 'android') {
	// 		try {
	// 			const granted = await PermissionsAndroid.request(
	// 				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
	// 				{
	// 					title: 'Storage Permission',
	// 					message: 'App needs access to your storage to save files.',
	// 					buttonPositive: 'OK',
	// 				}
	// 			);
	// 			return granted === PermissionsAndroid.RESULTS.GRANTED;
	// 		} catch (err) {
	// 			console.warn(err);
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// };
	// const handleDownload = async (track) => {
	// 	try {
	// 		// Ensure external storage permissions are granted
	// 		await requestStoragePermission();

	// 		const audioDownloadUri = `${FileSystem.dirs.DownloadDir}/${track.title}.mp3`;
	// 		const imageDownloadUri = `${FileSystem.dirs.DownloadDir}/${track.title}.jpg`;

	// 		// Download audio file to public storage
	// 		const audioDownloadResumable = FileSystem.createDownloadResumable(
	// 			track.audioUrl,
	// 			audioDownloadUri
	// 		);
	// 		await audioDownloadResumable.downloadAsync();

	// 		// Download thumbnail image to public storage
	// 		const imageDownloadResumable = FileSystem.createDownloadResumable(
	// 			track.thumbnailUri || unknownTrackImageUri,
	// 			imageDownloadUri
	// 		);
	// 		await imageDownloadResumable.downloadAsync();

	// 		console.log("Audio and image downloaded to:", audioDownloadUri, imageDownloadUri);
	// 		Toast.show({
	// 			type: 'success',
	// 			text1: 'Download Complete',
	// 			text2: `Track saved to ${audioDownloadUri}`,
	// 		});
	// 	} catch (error) {
	// 		console.error('Error downloading:', error);
	// 		Toast.show({
	// 			type: 'error',
	// 			text1: 'Download Error',
	// 			text2: 'An error occurred while downloading the track or metadata.',
	// 		});
	// 	}
	// };

	if (loading || isLoadingPlaylist || !activeTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		);
	}

	return (
		<LinearGradient
			style={{ flex: 1 }}
			colors={
				bgImgColors
					? [bgImgColors?.dominant, bgImgColors?.lightVibrant]
					: [colors.background, colors.primary]
			}
		>
			<View style={styles.overlayContainer}>
				<Heading title="Trình phát nhạc" />
				<View style={styles.artworkImageContainer}>
					<Image
						style={{ ...styles.artworkImage }}
						source={activeTrack.thumbnailM}
						placeholder={unknownTrackImageUri}
						contentFit="cover"
					/>
				</View>
				<View style={{ flex: 1 }}>
					<View style={{ marginVertical: 'auto' }}>
						<View style={{ height: 60 }}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<View style={styles.trackTitleContainer}>
									<MovingText
										text={activeTrack.title ?? ''}
										animationThreshold={30}
										style={styles.trackTitleText}
									/>
								</View>
								{isLoadingAdd || isLoadingRemove ? (
									<ActivityIndicator />
								) : (
									<FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
								)}
								<TouchableOpacity onPress={() => handleDownload()} style={styles.downloadButton}>
									<FontAwesome name="download" size={24} color={colors.icon} />
								</TouchableOpacity>
							</View>
							{activeTrack.artistsNames && (
								<Text numberOfLines={1} style={[styles.trackArtistText, { marginTop: 6 }]}>
									{activeTrack.artistsNames}
								</Text>
							)}
						</View>
						<PlayerControls style={{ marginTop: 40 }} playlists={playlists} />
						<PlayerProgressBar activeTrack={activeTrack} style={{ marginTop: 40 }} />
					</View>
				</View>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	artworkImageContainer: {
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 11.0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: '45%',
		marginTop: 30,
	},
	artworkImage: {
		width: '90%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		opacity: 0.8,
		maxWidth: '90%',
	},
});

// import { FontAwesome } from '@expo/vector-icons';
// import { Image } from 'expo-image';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import RNFS from 'react-native-fs';
// import Toast from 'react-native-toast-message';
// import { useActiveTrack } from 'react-native-track-player';
// import FavoriteButton from '../components/FavoriteButton';
// import Heading from '../components/Heading';
// import { MovingText } from '../components/MovingText';
// import { PlayerControls } from '../components/PlayerControls';
// import { PlayerProgressBar } from '../components/PlayerProgressbar';
// import { unknownTrackImageUri } from '../constants/images';
// import { colors, fontSize, screenPadding } from '../constants/tokens';
// import { getStringData } from '../hooks/useAsyncStorage';
// import { usePlayerBackground } from '../hooks/usePlayerBackground';
// import { useTrackPlayerFavorite } from '../hooks/useTrackPlayerFavorite';
// import useDetailPlaylist from '../services/home/useDetailPlaylist';
// import { defaultStyles } from '../styles';

// export default function PlayerScreen() {
// 	const activeTrack = useActiveTrack();
// 	const [playlistsId, setPlaylistsId] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	console.log('activeTrack', activeTrack);

// 	const { playlists, isLoadingPlaylist } = useDetailPlaylist(playlistsId);
// 	const { bgImgColors } = usePlayerBackground(activeTrack?.thumbnailM ?? unknownTrackImageUri);
// 	const {
// 		isFavorite,
// 		isLoading: isLoadingFavorite,
// 		isLoadingAdd,
// 		toggleFavorite,
// 		isLoadingRemove,
// 	} = useTrackPlayerFavorite();

// 	useEffect(() => {
// 		const fetchPlaylistsId = async () => {
// 			try {
// 				const id = await getStringData('playlistId');
// 				setPlaylistsId(id);
// 			} catch (error) {
// 				console.error('Error fetching playlist ID:', error);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchPlaylistsId();
// 	}, []);

// 	const handleDownload = async (track) => {
// 		try {
// 			// Ensure external storage permissions are granted
// 			if (Platform.OS === 'android') {
// 				const granted = await PermissionsAndroid.request(
// 					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
// 					{
// 						title: 'Storage Permission',
// 						message: 'App needs access to your storage to download files.',
// 						buttonNeutral: 'Ask Me Later',
// 						buttonNegative: 'Cancel',
// 						buttonPositive: 'OK',
// 					}
// 				);
// 				if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
// 					Toast.show({
// 						type: 'error',
// 						text1: 'Permission Denied',
// 						text2: 'Storage permission is required to download files.',
// 					});
// 					return;
// 				}
// 			}

// 			const audioDownloadUri = `${RNFS.DownloadDirectoryPath}/${track.title}.mp3`;
// 			const imageDownloadUri = `${RNFS.DownloadDirectoryPath}/${track.title}.jpg`;

// 			// Download audio file to public storage
// 			await RNFS.downloadFile({
// 				fromUrl: track.audioUrl,
// 				toFile: audioDownloadUri,
// 			}).promise;

// 			// Download thumbnail image to public storage
// 			await RNFS.downloadFile({
// 				fromUrl: track.thumbnailUri || unknownTrackImageUri,
// 				toFile: imageDownloadUri,
// 			}).promise;

// 			console.log("Audio and image downloaded to:", audioDownloadUri, imageDownloadUri);
// 			Toast.show({
// 				type: 'success',
// 				text1: 'Download Complete',
// 				text2: `Track saved to ${audioDownloadUri}`,
// 			});
// 		} catch (error) {
// 			console.error('Error downloading:', error);
// 			Toast.show({
// 				type: 'error',
// 				text1: 'Download Error',
// 				text2: 'An error occurred while downloading the track or metadata.',
// 			});
// 		}
// 	};

// 	if (loading || isLoadingPlaylist || !activeTrack) {
// 		return (
// 			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
// 				<ActivityIndicator color={colors.icon} />
// 			</View>
// 		);
// 	}

// 	return (
// 		<LinearGradient
// 			style={{ flex: 1 }}
// 			colors={
// 				bgImgColors
// 					? [bgImgColors?.dominant, bgImgColors?.lightVibrant]
// 					: [colors.background, colors.primary]
// 			}
// 		>
// 			<View style={styles.overlayContainer}>
// 				<Heading title="Trình phát nhạc" />
// 				<View style={styles.artworkImageContainer}>
// 					<Image
// 						style={{ ...styles.artworkImage }}
// 						source={activeTrack.thumbnailM}
// 						placeholder={unknownTrackImageUri}
// 						contentFit="cover"
// 					/>
// 				</View>
// 				<View style={{ flex: 1 }}>
// 					<View style={{ marginVertical: 'auto' }}>
// 						<View style={{ height: 60 }}>
// 							<View
// 								style={{
// 									flexDirection: 'row',
// 									justifyContent: 'space-between',
// 									alignItems: 'center',
// 								}}
// 							>
// 								<View style={styles.trackTitleContainer}>
// 									<MovingText
// 										text={activeTrack.title ?? ''}
// 										animationThreshold={30}
// 										style={styles.trackTitleText}
// 									/>
// 								</View>
// 								{isLoadingAdd || isLoadingRemove ? (
// 									<ActivityIndicator />
// 								) : (
// 									<FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
// 								)}
// 								<TouchableOpacity onPress={() => handleDownload(activeTrack)} style={styles.downloadButton}>
// 									<FontAwesome name="download" size={24} color={colors.icon} />
// 								</TouchableOpacity>
// 							</View>
// 							{activeTrack.artistsNames && (
// 								<Text numberOfLines={1} style={[styles.trackArtistText, { marginTop: 6 }]}>
// 									{activeTrack.artistsNames}
// 								</Text>
// 							)}
// 						</View>
// 						<PlayerControls style={{ marginTop: 40 }} playlists={playlists} />
// 						<PlayerProgressBar activeTrack={activeTrack} style={{ marginTop: 40 }} />
// 					</View>
// 				</View>
// 			</View>
// 		</LinearGradient>
// 	);
// }

// const styles = StyleSheet.create({
// 	overlayContainer: {
// 		...defaultStyles.container,
// 		paddingHorizontal: screenPadding.horizontal,
// 		backgroundColor: 'rgba(0,0,0,0.5)',
// 	},
// 	artworkImageContainer: {
// 		shadowOffset: {
// 			width: 0,
// 			height: 8,
// 		},
// 		shadowOpacity: 0.44,
// 		shadowRadius: 11.0,
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		height: '45%',
// 		marginTop: 30,
// 	},
// 	artworkImage: {
// 		width: '90%',
// 		height: '100%',
// 		resizeMode: 'cover',
// 		borderRadius: 12,
// 	},
// 	trackTitleContainer: {
// 		flex: 1,
// 		overflow: 'hidden',
// 	},
// 	trackTitleText: {
// 		...defaultStyles.text,
// 		fontSize: 22,
// 		fontWeight: '700',
// 	},
// 	trackArtistText: {
// 		...defaultStyles.text,
// 		fontSize: fontSize.base,
// 		opacity: 0.8,
// 		maxWidth: '90%',
// 	},
// });
