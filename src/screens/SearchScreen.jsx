import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { searchSongsAndArtists } from '../api'
import ArtistListItem from '../components/ArtistListItem'
import TextInput from '../components/TextInput'
import TrackListItem from '../components/TrackListItem'
import { colors } from '../constants/tokens'
import useHome from '../services/home/useHome'
import { useQueue } from '../store/queue'
import { defaultStyles, utilsStyles } from '../styles'

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export default function SearchScreen() {
	const { isLoading } = useHome()
	const [searchQuery, setSearchQuery] = useState('')
	const [combinedResults, setCombinedResults] = useState([])
	const [error, setError] = useState(null)
	const { setActiveQueueId, setCurrentTrackId } = useQueue()
	const [isSearching, setIsSearching] = useState(false)

	const handleTrackSelect = async (selectedTrack) => {
		setActiveQueueId()
		setCurrentTrackId(selectedTrack.encodeId)
	}

	if (isLoading) {
		return <Text>Loading...</Text>
	}

	const handleSearchQuery = async (query) => {
		setSearchQuery(query)

		if (query.trim().length > 0) {
			setIsSearching(true)
			try {
				const results = await searchSongsAndArtists(query)

				const mergedResults = [
					...(results.songs || []).map((song) => ({ ...song, type: 'song' })),
					...(results.artists || []).map((artist) => ({ ...artist, type: 'artist' })),
				]
				setCombinedResults(mergedResults)
				setError(null)
			} catch (err) {
				setError('Failed to fetch results')
				console.error(err)
			} finally {
				setIsSearching(false)
			}
		} else {
			setCombinedResults([])
		}
	}

	const renderItem = ({ item }) => {
		if (item.type === 'song') {
			return <TrackListItem track={item} onTrackSelect={handleTrackSelect} />
		}
		if (item.type === 'artist') {
			return <ArtistListItem artist={item} onTrackSelect={handleTrackSelect} />
		}
		return null
	}

	return (
		<View style={defaultStyles.container}>
			<TextInput
				placeholder="Search"
				placeholderTextColor="#ccc"
				style={styles.textInput}
				clearButtonMode="always"
				onChangeText={handleSearchQuery}
				value={searchQuery}
				autoCorrect={true}
				autoCapitalize="none"
				keyboardType="default"
			/>
			{error && <Text style={styles.errorText}>{error}</Text>}

			<FlatList
				data={combinedResults}
				keyExtractor={(item, index) => item.encodeId || item.id || index.toString()}
				renderItem={renderItem}
				ListEmptyComponent={
					!isSearching && searchQuery.trim().length > 0 ? (
						<Text style={styles.text}>No results found</Text>
					) : null
				}
				ItemSeparatorComponent={ItemDivider}
				style={styles.list}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	textInput: {
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderColor: '#fff',
		borderWidth: 1,
		borderRadius: 8,
		color: colors.text,
		marginTop: 20,
	},
	errorText: {
		color: colors.text,
		marginTop: 10,
	},
	list: {
		marginTop: 20,
	},
	text: {
		color: colors.text,
	},
})
