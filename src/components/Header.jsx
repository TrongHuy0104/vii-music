import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, fontSize, fontWeight } from '../constants/tokens'

export default function Header({ title }) {
	const navigation = useNavigation()

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Pressable onPress={() => navigation.navigate('Search')}>
				<Ionicons name="search" size={28} color={colors.white} />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 8,
		paddingRight: 12,
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		color: colors.text,
		fontSize: fontSize.xxl,
		fontWeight: fontWeight.bold,
	},
})
