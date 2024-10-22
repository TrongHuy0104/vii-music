import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { useActiveTrack } from 'react-native-track-player'
import Heading from '../components/Heading'
import { MovingText } from '../components/MovingText'
import { PlayerControls } from '../components/PlayerControls'
import { PlayerProgressBar } from '../components/PlayerProgressbar'
import { unknownTrackImageUri } from '../constants/images'
import { colors, fontSize, screenPadding } from '../constants/tokens'
import { getStringData } from '../hooks/useAsyncStorage'
import { usePlayerBackground } from '../hooks/usePlayerBackground'
import useDetailPlaylist from '../services/home/useDetailPlaylist'
import { useQueue } from '../store/queue'
import { defaultStyles } from '../styles'
const safeToString = (value) => (value ? value.toString() : '')
export default function PlayerScreen() {
	const activeTrack = useActiveTrack() // Get the active track
	const { activeQueueId } = useQueue() // Get the active queue ID
	const [playlistsId, setPlaylistsId] = useState(null) // State to store playlist ID
	const [loading, setLoading] = useState(true) // State for loading status
	const [isModalVisible, setModalVisible] = useState(false) // Modal visibility state
	const navigation = useNavigation() // Hook for navigation

	useEffect(() => {
		// Fetch playlist ID asynchronously
		const fetchPlaylistsId = async () => {
			try {
				const id = await getStringData('playlistId')
				setPlaylistsId(id)
			} catch (error) {
				console.error('Error fetching playlist ID:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchPlaylistsId()
	}, [])

	// Fetch playlist details using custom hook
	const { playlists, isLoadingPlaylist } = useDetailPlaylist(playlistsId)
	// Fetch background image colors for player
	const { bgImgColors } = usePlayerBackground(activeTrack?.thumbnailM ?? unknownTrackImageUri)
	const isFavorite = false // Placeholder for favorite state

	if (loading || isLoadingPlaylist || !activeTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)
	}

	// Function to handle artist click
	const handleArtistClick = () => {
		// Check if there is more than one artist
		if (activeTrack.artists.length > 1) {
			setModalVisible(true) // Show the modal for multiple artists
		} else if (activeTrack.artists.length === 1) {
			// If there's only one artist, navigate directly
			navigateToArtistProfile(activeTrack.artists[0].link)
		} else {
			// Handle case where there are no artists (just in case)
			console.error('No artists available for this track.')
		}
	}

	const navigateToArtistProfile = (artistLink) => {
		console.log('Navigating to artist profile:', artistLink)

		// Check if the link contains '/nghe-si/', if yes, remove that part; otherwise, keep it as is
		const artistName = artistLink.includes('/nghe-si/')
			? artistLink.replace('/nghe-si/', '') // Remove '/nghe-si/' if present
			: artistLink.replace('/', '') // Remove leading '/' if present

		navigation.navigate('ArtistProfile', { artistName })
	}
	const artistNamess = activeTrack?.artists
		? activeTrack.artists.map((artist) => safeToString(artist.name)).join(', ')
		: 'Nghệ sĩ chưa được cập nhật'

	// Shorten the artist names for display if too long
	const displayArtistNames =
		artistNamess.length > 30 ? `${artistNamess.substring(0, 30)}...` : artistNamess

	return (
		<View style={{ flex: 1 }}>
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
									<FontAwesome
										name={isFavorite ? 'heart' : 'heart-o'}
										size={20}
										color={isFavorite ? colors.primary : colors.icon}
										style={{ marginHorizontal: 14 }}
									/>
								</View>

								{/* Artist names with click handler */}
								<TouchableOpacity onPress={handleArtistClick}>
									<Text style={[styles.trackArtistText, { marginTop: 6 }]}>
										{displayArtistNames}
									</Text>
								</TouchableOpacity>

								{/* Modal to display multiple artists */}
								<Modal
									isVisible={isModalVisible}
									onSwipeComplete={() => setModalVisible(false)} // Close modal when swiped down
									swipeDirection="down" // Allow swipe down gesture
									style={styles.modalContainer} // Align modal at the bottom
									onBackdropPress={() => setModalVisible(false)}
									backdropOpacity={0.3} // Dim the background
								>
									<View style={styles.modalContent}>
										<Text style={styles.modalTitle}>Nghệ sĩ</Text>
										<FlatList
											data={activeTrack.artists}
											keyExtractor={(item) => item.id}
											renderItem={({ item }) => (
												<TouchableOpacity
													style={styles.artistContainer}
													onPress={() => {
														navigateToArtistProfile(item.link)
														setModalVisible(false)
													}}
												>
													<Image source={{ uri: item.thumbnailM }} style={styles.artistImage} />
													<View style={styles.artistInfo}>
														<Text style={styles.artistName}>{item.name}</Text>
														<Text style={styles.artistFollowers}>quan tâm</Text>
													</View>
												</TouchableOpacity>
											)}
										/>
									</View>
								</Modal>
							</View>
							<PlayerControls style={{ marginTop: 40 }} playlists={playlists} />
							<PlayerProgressBar activeTrack={activeTrack} style={{ marginTop: 40 }} />
						</View>
					</View>
				</View>
			</LinearGradient>
		</View>
	)
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
	modalContainer: {
		justifyContent: 'flex-end', // Position modal at the bottom
		margin: 0, // No margin around modal
	},
	modalContent: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		width: '100%',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	artistContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
	},
	artistImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 15,
	},
	artistInfo: {
		flex: 1,
	},
	artistName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	artistFollowers: {
		fontSize: 14,
		color: '#666',
	},
	closeButton: {
		marginTop: 20,
		fontSize: 16,
		color: '#007BFF',
		textAlign: 'center',
	},
})
