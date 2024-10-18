import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Pressable, TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../constants/tokens'

export default function Button(props) {
	const { onPress, title } = props
	return (
		<Pressable style={[styles.button]} onPress={onPress}>
			<TouchableOpacity activeOpacity={0.7}>
				<Text style={styles.text}>{title}</Text>
			</TouchableOpacity>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 12,
		paddingVertical: 8,
		paddingHorizontal: 32,
		borderRadius: 6,
		elevation: 3,
		backgroundColor: colors.primary,
		width: '100%',
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
		width: '100%',
		display: 'block',
	},
})
