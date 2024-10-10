import { Image } from 'expo-image'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { unknownTrackImageUri } from '../constants/images'
import { defaultStyles } from '../styles'
import { MovingText } from './MovingText'
import { PlayPauseButton, SkipToNextButton } from './PlayerControls'

export const FloatingPlayer = () => {
	const displayedTrack = {
		thumbnailM: null,
		title: 'aaseruweuuerutbirutreusfsdsdsdst',
	}

	if (!displayedTrack) return null

	return (
		<TouchableOpacity activeOpacity={0.9} style={styles.container}>
			<>
				<Image
					style={{ ...styles.trackArtworkImage }}
					source={displayedTrack.thumbnailM}
					placeholder={unknownTrackImageUri}
					contentFit="cover"
					transition={1000}
				/>
				<View style={styles.trackTitleContainer}>
					{/* <Text style={styles.trackTitle}>{displayedTrack.title}</Text> */}
					<MovingText
						style={styles.trackTitle}
						text={displayedTrack.title}
						animationThreshold={25}
					/>
				</View>
				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#3B3B4A',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
		position: 'absolute',
		left: 12,
		right: 12,
		bottom: 60,
	},
	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
})
