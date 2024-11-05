import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { colors } from '../constants/tokens'

export default function FavoriteButton({ isFavorite, toggleFavorite }) {
	return (
		<FontAwesome
			name={isFavorite ? 'heart' : 'heart-o'}
			size={20}
			color={isFavorite ? colors.primary : colors.icon}
			onPress={toggleFavorite}
		/>
	)
}
