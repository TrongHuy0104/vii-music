import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fontSize, fontWeight } from '../constants/tokens'
import { useGoBack } from '../hooks/useGoBack'

const BackButton = () => {
	const goBack = useGoBack()
	return (
		<TouchableOpacity onPress={goBack} style={styles.backButton}>
			<View>
				<MaterialCommunityIcons name="arrow-left" size={24} color={colors.white} />
			</View>
		</TouchableOpacity>
	)
}
const Heading = ({ title }) => {
	return (
		<View style={styles.container}>
			<BackButton />
			{title && <Text style={styles.headingTitle}>{title}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 8,
		backgroundColor: 'transparent',
	},

	backButton: {
		position: 'absolute',
		top: 8,
		left: 0,
	},

	headingTitle: {
		color: colors.white,
		fontSize: fontSize.lg,
		fontWeight: fontWeight.bold,
		marginHorizontal: 12,
	},
})

export default Heading
