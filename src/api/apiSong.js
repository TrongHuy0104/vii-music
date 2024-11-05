import { supabase } from '../utils/supabase'

export async function addMySong({ encodeId, favoriteSongData, songData = null }) {
	// Check if the song exists
	let currentSong
	const { data: existSong, error: error1 } = await supabase
		.from('Song')
		.select('*')
		.eq('encodeId', encodeId)
		.single()
	currentSong = existSong

	// Insert the song if it doesn't exist
	if (!existSong) {
		const { data: newSong, error: errorInsertSong } = await supabase
			.from('Song')
			.insert([songData])
			.select()
			.single()
		if (errorInsertSong) throw new Error(errorInsertSong.message)
		currentSong = newSong
	}

	// // Insert favorite song
	const { data: favoriteSong, error: error2 } = await supabase
		.from('FavoriteSong')
		.insert([{ ...favoriteSongData, songId: currentSong.id }])
		.select()

	if (error2) throw new Error(error2.message)

	return favoriteSong
}

export async function getFavoriteSongs({ userId }) {
	const { data, error } = await supabase
		.from('FavoriteSong')
		.select('*, Song(*)')
		.eq('userId', userId)

	if (error) throw new Error(error.message)
	return data
}
export async function removeFavoriteSong({ userId, encodeId }) {
	const { error } = await supabase
		.from('FavoriteSong')
		.delete()
		.eq('userId', userId)
		.eq('encodeId', encodeId)

	if (error) throw new Error(error.message)
}
