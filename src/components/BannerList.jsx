import React from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useBanners from '../services/home/useBanners'

const { width: viewportWidth } = Dimensions.get('window')

const BannerList = ({ navigation }) => {
	const { isPending, banners } = useBanners()
	const handleBannerPress = (encodeId) => {
		// Navigate to Playlist screen, passing the encodeId
		navigation.navigate('playlist', { encodeId })
	}

	return (
		<View>
			<FlatList
				data={banners}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => handleBannerPress(item.encodeId)}>
						<View style={styles.bannerContainer}>
							{item.banner ? (
								<Image source={{ uri: item.banner }} style={styles.bannerImage} />
							) : (
								<Text>No Banner Available</Text>
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
		marginHorizontal: 7.8,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	bannerImage: {
		width: 300,
		height: 150,
		borderRadius: 10,
	},
	bannerTitle: {
		marginTop: 10,
		fontSize: 16,
		fontWeight: 'bold',
	},
})

export default BannerList
