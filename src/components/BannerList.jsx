import React from 'react'
import { Dimensions, FlatList, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import useBanners from '../services/home/useBanners'

const { width: viewportWidth } = Dimensions.get('window')

const BannerList = ({ navigation }) => {
	const { isPending, banners } = useBanners()
	const handleBannerPress = (encodeId) => {
		// Navigate to Playlist screen, passing the encodeId
		navigation.navigate('playlist', { encodeId })
	}

	console.log('API Response:', banners)
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
		marginHorizontal: 7.8, // Khoảng cách giữa các banner
		alignItems: 'center',
		justifyContent: 'center', // Bo góc
		overflow: 'hidden', // Ẩn phần hình ảnh bị vượt ra ngoài góc bo tròn
	},
	bannerImage: {
		width: 300, // Ảnh rộng 100% của container
		height: 150, // Chiều cao banner
		borderRadius: 10,
	},
	bannerTitle: {
		marginTop: 10,
		fontSize: 16,
		fontWeight: 'bold',
	},
})

export default BannerList
