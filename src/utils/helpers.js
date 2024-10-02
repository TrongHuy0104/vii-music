export const getInPremiumSongs = (songs) => {
	return songs.filter((song) => song.streamingStatus === 1)
}

export const getInPremiumSongsDuration = (songs) => {
	return songs.reduce((total, song) => total + song.duration, 0)
}

export const formatSongDuration = (duration) => {
	const hours = parseInt(duration / 3600, 10)
	const minutes = parseInt((duration - hours * 3600) / 60, 10)
	return `${hours} giờ ${minutes} phút`
}
