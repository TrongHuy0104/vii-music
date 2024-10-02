import React from 'react'
import { StyleSheet, View } from 'react-native'
import Heading from '../../components/Heading'
import { defaultStyles } from '../../styles'

export default function SongScreen() {
	return (
		<View style={defaultStyles.container}>
			<Heading title="Bài hát" />
		</View>
	)
}

const styles = StyleSheet.create({})
