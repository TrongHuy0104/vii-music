import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TrackListItem from '../../components/TrackListItem'
import { colors, fontSize, screenPadding } from '../../constants/tokens'
import useHome from '../../services/home/useHome'
import { useQueue } from '../../store/queue'
import { defaultStyles, utilsStyles } from '../../styles'

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const NewReleaseList = () => {
	const { isLoading, newrealeases } = useHome()
	const navigation = useNavigation()
	const { setActiveQueueId, setCurrentTrackId } = useQueue()

	const handleTrackSelect = async (selectedTrack) => {
		setActiveQueueId()
		setCurrentTrackId(selectedTrack.encodeId)
	}
	if (isLoading) {
		return <Text>Loading...</Text>
	}

	const renderItem = ({ item }) => <TrackListItem track={item} onTrackSelect={handleTrackSelect} />

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
				ItemSeparatorComponent={ItemDivider}
				ListFooterComponent={ItemDivider}
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
	},
	albumCover: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginRight: 10,
	},
	infoContainer: {
		flex: 1,
		borderColor: colors.textMuted,
		borderBottomWidth: 0.3,
	},
	title: {
		fontSize: fontSize.sm,
		fontWeight: 'bold',
		color: colors.text,
	},
	artist: {
		fontSize: fontSize.sm,
		color: colors.textMuted,
	},
})

export default NewReleaseList
