import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fontSize, fontWeight } from '../constants/tokens'

export default function Header({ title }) {
	return (
		<View style={{ textAlign: 'center' }}>
			<Text style={styles.header}>Vii Music</Text>
			<Text style={styles.title}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		fontSize: fontSize.xl,
		color: colors.primary,
		paddingVertical: 12,
		fontWeight: fontWeight.bold,
		textAlign: 'center',
	},
	title: {
		fontSize: fontSize.xxl,
		color: colors.white,
		paddingVertical: 12,
		fontWeight: fontWeight.bolder,
	},
})
