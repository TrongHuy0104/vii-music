import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
	},
	seeMore: {
		fontSize: 25,
		marginLeft: 15,
		color: '#fff',
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	filterButton: {
		fontSize: 16,
		color: '#fff',
		padding: 8,
	},
	activeFilter: {
		color: '#007bff',
		fontWeight: 'bold',
	},
	row: {
		marginBottom: 5,
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		marginVertical: 8,
		paddingVertical: 5,
		paddingHorizontal: 10,
		alignItems: 'center',
		borderRadius: 8,
		backgroundColor: '#f9f9f9',
		marginRight: 20,
		height: 60,
		width: '50%',
	},
	albumCover: {
		width: 50,
		height: 50,
		borderRadius: 8,
		marginRight: 10,
	},
	infoContainer: {
		flex: 1,
	},
	title: {
		fontSize: 15,
		fontWeight: 'bold',
		textAlign: 'left',
	},
	artist: {
		fontSize: 13,
		color: 'gray',
		textAlign: 'left',
	},
})

export default styles
