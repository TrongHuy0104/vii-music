import React from 'react'
import { TextInput as Input, StyleSheet, Text, View } from 'react-native'
import { colors, fontSize } from '../constants/tokens'

export default function TextInput({ errorText, description, placeHolder, ...props }) {
	return (
		<View style={styles.container}>
			<Input
				style={styles.input}
				selectionColor={colors.primary}
				underlineColor="transparent"
				mode="outlined"
				placeholder={placeHolder}
				{...props}
			/>
			{description && !errorText ? <Text style={styles.description}>{description}</Text> : null}
			{errorText ? <Text style={styles.error}>{errorText}</Text> : null}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 12,
		borderRadius: 8,
	},
	input: {
		width: '100%',
		backgroundColor: colors.white,
		paddingHorizontal: 8,
		paddingVertical: 6,
		marginTop: 10,
		borderRadius: 8,
		fontSize: fontSize.base,
		borderWidth: 1,
		borderColor: colors.black,
	},
	description: {
		fontSize: fontSize.sm,
		color: colors.textMuted,
		paddingTop: 8,
	},
	error: {
		fontSize: fontSize.sm,
		color: colors.error,
		paddingTop: 8,
	},
})
