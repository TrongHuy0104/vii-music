import React from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function ModalEdit({
	visible,
	onClose,
	onSave,
	value,
	onChangeValue,
	title,
	placeholder,
}) {
	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
			<View style={styles.modalContainer}>
				<View style={styles.modalView}>
					<Text style={styles.modalTitle}>{title}</Text>
					<TextInput
						style={styles.input}
						value={value}
						onChangeText={onChangeValue}
						placeholder={placeholder}
					/>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.saveButton} onPress={onSave}>
							<Text style={styles.saveButtonText}>SAVE</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.cancelButton} onPress={onClose}>
							<Text style={styles.cancelButtonText}>CANCEL</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalView: {
		width: '80%',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	input: {
		width: '100%',
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		borderRadius: 5,
		marginBottom: 20,
	},
	buttonContainer: {
		flexDirection: 'row', // Đặt các nút nằm ngang
		justifyContent: 'space-between', // Tạo khoảng cách giữa các nút
		width: '100%',
	},
	saveButton: {
		flex: 1,
		backgroundColor: 'blue',
		padding: 10,
		borderRadius: 5,
		marginRight: 10, // Tạo khoảng cách giữa nút Save và Cancel
		alignItems: 'center',
	},
	cancelButton: {
		flex: 1,
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	saveButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	cancelButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
})
