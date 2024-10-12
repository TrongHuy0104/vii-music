import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fontSize, screenPadding } from '../../constants/tokens'
import useHome from '../../services/home/useHome'
import { defaultStyles } from '../../styles'

const NewReleaseList = () => {
	const { isLoading, newrealeases } = useHome()
	const navigation = useNavigation()

	if (isLoading) {
		return <Text>Loading...</Text>
	}

	const renderItem = ({ item }) => (
		<View style={styles.item}>
			<Image source={{ uri: item.thumbnail }} style={styles.albumCover} />
			<View style={styles.infoContainer}>
				<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
					{item.title}
				</Text>
				<Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">
					{item.artistsNames}
				</Text>
			</View>
		</View>
	)

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name="arrow-back" size={24} color={colors.text} />
				</TouchableOpacity>
				<Text style={styles.header}>Mới Phát Hành</Text>
			</View>
			<FlatList
				data={newrealeases}
				keyExtractor={(item) => item.encodeId.toString()}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.text,
		marginLeft: 10,
	},
	item: {
		flexDirection: 'row',
		marginVertical: 8,
		paddingVertical: 5,
		alignItems: 'center',
		borderRadius: 8,
		paddingHorizontal: 10,
		// border: utilsStyles.itemSeparator,
	},
	albumCover: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginRight: 10,
	},
	infoContainer: {
		flex: 1,
	},
	title: {
		fontSize: fontSize.base,
		fontWeight: 'bold',
		color: colors.text,
	},
	artist: {
		fontSize: fontSize.base,
		color: colors.textMuted, // Use the muted text color
	},
})

export default NewReleaseList
