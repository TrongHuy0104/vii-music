import { LinearGradient } from 'expo-linear-gradient' // Gradient from expo-linear-gradient
import React from 'react'
import {
	ActivityIndicator,
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { colors } from '../constants/tokens'

import Heading from '../components/Heading'
import useDetailArtist from '../services/home/useArtistProfile' // Import hook to get artist information

const { width } = Dimensions.get('window') // Get screen dimensions
const safeToString = (value) => (value ? value.toString() : '')

const ArtistProfile = ({ route }) => {
	// Get artistName from params
	const { artistName } = route.params
	console.log('Received artistName:', artistName)
	// Use the hook to get artist data
	const { isLoadingArtist, artist } = useDetailArtist(artistName)

	// Log data to check
	console.log('Artist data:', artist)

	// Process biography to remove <br> tags
	const biographyy = artist?.biography?.replace(/<br\s*\/?>/gi, '\n')

	// Show spinner if the data is still loading
	if (isLoadingArtist) {
		return (
			<View
				style={[
					{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: colors.background,
					},
				]}
			>
				<ActivityIndicator size="large" color="#FFF" s />
			</View>
		)
	}

	return (
		<ScrollView
			contentContainerStyle={[
				{ flexGrow: 1, minHeight: '100%', backgroundColor: colors.background },
			]}
		>
			<Heading title="Artist Profile" />
			{/* Header section - artist image and info */}
			<View style={styles.header}>
				<Image
					source={{ uri: artist?.thumbnail || 'https://fallback-url.com/default.jpg' }} // Artist image or fallback image
					style={[styles.artistImage, { width: width }]} // Set image width based on screen size
				/>
				<LinearGradient
					colors={['transparent', 'rgba(0,0,0,0.9)']} // Gradient from transparent to dark
					style={styles.gradient}
				>
					<Text style={styles.artistName}>{safeToString(artist?.name)}</Text>
					{/* <Text style={styles.fansCount}>
						{safeToString(formatNumber(artist?.totalFollow))} followers
					</Text> */}
					<Text style={styles.fansCount}>{safeToString(artist?.totalFollow)} followers</Text>
				</LinearGradient>
			</View>

			{/* Additional information section */}
			<View style={styles.additionalInfo}>
				<Text style={styles.sectionTitle}>Information</Text>
				<Text style={styles.infoText}>Real name: {artist?.realname || 'Unknown'}</Text>
				<Text style={styles.infoText}>Birthday: {artist?.birthday || 'Unknown'}</Text>
				<Text style={styles.infoText}>Country: {artist?.national || 'Unknown'}</Text>
				<Text style={styles.infoText}>Genre: {artist?.genre || 'Unknown'}</Text>
				<Text style={styles.bioText}>{biographyy || 'No biography available'}</Text>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, // Set flex to stretch content to fit the screen
	},
	header: {
		position: 'relative', // Position LinearGradient over the image
		alignItems: 'center',
		marginTop: 10,
	},
	artistImage: {
		height: width, // Image height equals screen width
		resizeMode: 'cover', // Ensure the image is fully displayed
		width: width,
	},
	gradient: {
		position: 'absolute',
		bottom: 0, // Position the gradient at the bottom of the image
		width: width,
		paddingVertical: 20,
		alignItems: 'center',
	},
	artistName: {
		fontSize: 30, // Increase font size
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 5,
		textShadowColor: 'rgba(0, 0, 0, 0.5)', // Text shadow color
		textShadowOffset: { width: 2, height: 2 }, // Text shadow direction
		textShadowRadius: 4, // Text shadow blur radius
	},
	fansCount: {
		fontSize: 18, // Increase font size
		color: '#cdcdcd',
		textShadowColor: 'rgba(0, 0, 0, 0.5)', // Text shadow color
		textShadowOffset: { width: 1, height: 1 }, // Text shadow direction
		textShadowRadius: 2, // Text shadow blur radius
	},
	additionalInfo: {
		paddingHorizontal: 10,
		marginTop: 20,
		marginBottom: 50,
		paddingBottom: 80,
		backgroundColor: colors.background,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 10,
	},
	infoText: {
		fontSize: 16,
		color: '#ccc',
		marginBottom: 5,
	},
	bioText: {
		fontSize: 14,
		color: '#aaa',
		marginTop: 10,
	},
	loadingContainer: {
		flex: 1, // Full screen
		justifyContent: 'center', // Center content vertically
		alignItems: 'center', // Center content horizontally
	},
})

export default ArtistProfile
