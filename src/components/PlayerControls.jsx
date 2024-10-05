import { FontAwesome6 } from '@expo/vector-icons'
import { TouchableOpacity, View } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import { colors } from '../constants/tokens'

export const PlayPauseButton = ({ iconSize, styles }) => {
	const { playing } = useIsPlaying()
	return (
		<View style={[{ height: iconSize }, styles]}>
			<TouchableOpacity
				activeOpacity={0.85}
				onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
			>
				<FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={colors.text} />
			</TouchableOpacity>
		</View>
	)
}

export const SkipToNextButton = ({ iconSize = 30 }) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
			<FontAwesome6 name="forward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

export const SkipToPreviousButton = ({ iconSize = 30 }) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
			<FontAwesome6 name="backward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}
