import React from 'react'
import { View } from 'react-native'
import Heading from '../../components/Heading'
import { defaultStyles } from '../../styles'
import FavoriteBox from './FavoriteBox'

export default function SongScreen({ navigation }) {
	return (
		<View style={defaultStyles.container}>
			<Heading title="Bài hát" />
			<FavoriteBox navigation={navigation} />
		</View>
	)
}
