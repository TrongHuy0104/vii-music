import { Text, View } from 'react-native'
import useBanners from '../../../services/home/useBanners'
import { defaultStyles } from '../../../styles'

const HomeScreen = () => {
	const { banners, isLoadingBanners } = useBanners()
	// useEffect(() => {
	// 	if (isLoadingBanners) console.log(banners)
	// }, [isLoadingBanners, banners])
	if (isLoadingBanners)
		return (
			<View style={defaultStyles.container}>
				<Text style={defaultStyles.text}>Loading...</Text>
			</View>
		)

	return <View style={defaultStyles.container}></View>
}

export default HomeScreen
