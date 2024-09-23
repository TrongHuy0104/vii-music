import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import { defaultStyles } from '../../styles'

export default function UserScreen() {
	return (
		<View style={defaultStyles.container}>
			<Header title="Cá nhân" />
		</View>
	)
}

const styles = StyleSheet.create({})
