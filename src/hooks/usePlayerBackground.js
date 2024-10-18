import { useEffect, useState } from 'react'
import { getColors } from 'react-native-image-colors'
import { colors } from '../constants/tokens'

export const usePlayerBackground = (imageUrl) => {
	const [bgImgColors, setBgImgColors] = useState(null)

	useEffect(() => {
		getColors(imageUrl, {
			fallback: colors.background,
			cache: true,
			key: imageUrl,
		}).then((colors) => {
			setBgImgColors(colors)
		})
	}, [imageUrl])

	return { bgImgColors }
}
