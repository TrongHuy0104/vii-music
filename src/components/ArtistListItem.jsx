import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { unknownArtistImageUri } from '../constants/images'
import { colors, fontSize } from '../constants/tokens'
import { defaultStyles } from '../styles'

export default function ArtistListItem({ artist, onArtistSelect }) {
	const { name, thumbnailM, totalFollow } = artist
	const formatFollowCount = (count) => {
		if (count >= 1e6) {
			return `${(count / 1e6).toFixed(1)}M` // Hiển thị triệu
		} else if (count >= 1e3) {
			return `${(count / 1e3).toFixed(1)}K` // Hiển thị nghìn
		} else {
			return count.toString() // Hiển thị số nguyên
		}
	}

	return (
		<TouchableHighlight onPress={() => onArtistSelect(artist)}>
			<View style={styles.artistItemContainer}>
				{/* Artist thumb */}
				<View>
					<Image
						style={styles.artistArtworkImage}
						source={thumbnailM}
						placeholder={unknownArtistImageUri}
						contentFit="cover"
						transition={1000}
					/>
				</View>
				{/* Artist name */}
				<View style={{ width: '100%' }}>
					<Text numberOfLines={1} style={styles.artistNameText}>
						{name}
					</Text>
					<Text numberOfLines={1} style={styles.trackArtistText}>
						Nghệ sĩ - {formatFollowCount(totalFollow)} quan tâm
					</Text>
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
		paddingVertical: 10,
	},
	artistArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
})
