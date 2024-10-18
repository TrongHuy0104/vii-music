import React from 'react'
import { ImageBackground, KeyboardAvoidingView, StyleSheet } from 'react-native'

export default function Background({ children }) {
	return (
		<ImageBackground
			source={require('../../assets/authentication-background.png')}
			resizeMode="cover"
			style={styles.background}
		>
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				{children}
			</KeyboardAvoidingView>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	container: {
		flex: 1,
		width: '100%',
		maxWidth: 340,
		padding: 10,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
