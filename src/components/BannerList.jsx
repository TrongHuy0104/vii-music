import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../constants/tokens'

const BannerList = ({ navigation, banners }) => {
	const handleBannerPress = (encodeId) => {
		// Navigate to Playlist screen, passing the encodeId
		navigation.navigate('SongList', { encodeId })
	}

	return (
		<View>
			<FlatList
				data={banners}
				renderItem={({ item }) => (
					<TouchableOpacity activeOpacity={0.8} onPress={() => handleBannerPress(item.encodeId)}>
						<View style={styles.bannerContainer}>
							{item.banner ? (
								<Image source={{ uri: item.banner }} style={styles.bannerImage} />
							) : (
								<Text style={styles.bannerTitle}>No Banner Available</Text>
							)}
						</View>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.encodeId}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	bannerContainer: {
		marginVertical: 12,
		marginHorizontal: 7.8,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	bannerImage: {
		width: 280,
		height: 150,
		borderRadius: 10,
	},
	bannerTitle: {
		color: colors.text,
		marginTop: 10,
		fontSize: 16,
		fontWeight: 'bold',
	},
})

export default BannerList
