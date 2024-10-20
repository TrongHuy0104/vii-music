import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { colors, fontSize, fontWeight } from '../constants/tokens'
import ArtistItem from './ArtistItem'

const ArtistSuggestion = ({ suggestedArtists, onAddArtist }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>Nghệ sĩ gợi ý</Text>
			<FlatList
				data={suggestedArtists}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <ArtistItem artist={item} onAddArtist={onAddArtist} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		// marginTop: 20,
	},
	sectionTitle: {
		fontSize: fontSize.base,
		fontWeight: fontWeight.medium,
		color: colors.text,
		marginBottom: 10,
		marginLeft: 10,
	},
})

export default ArtistSuggestion
