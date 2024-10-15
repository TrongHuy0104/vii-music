import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

const EditNameScreen = ({ navigation }) => {
	const [name, setName] = useState('')

	const saveName = () => {
		// Logic để lưu tên
		navigation.goBack() // Quay lại trang trước
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Edit Name</Text>
			<TextInput
				style={styles.input}
				value={name}
				onChangeText={setName}
				placeholder="Enter your name"
			/>
			<Button title="Save" onPress={saveName} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	label: {
		fontSize: 18,
		marginBottom: 10,
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
	},
})

export default EditNameScreen
