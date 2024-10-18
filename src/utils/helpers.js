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

export const formatSecondsToMinutes = (seconds) => {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)

	const formattedMinutes = String(minutes).padStart(2, '0')
	const formattedSeconds = String(remainingSeconds).padStart(2, '0')

	return `${formattedMinutes}:${formattedSeconds}`
}

export function emailValidator(email) {
	const re = /\S+@\S+\.\S+/
	if (!email) return 'Please fill in this field.'
	if (!re.test(email)) return 'Please enter a valid email address!'
	return ''
}

export function passwordValidator(password) {
	if (!password) return 'Please fill in this field.'
	if (password.length < 8) return 'Password should contain at least 8 characters.'
	return ''
}

export function nameValidator(name) {
	if (!name) return 'Please fill in this field.'
	return ''
}

export function confirmPasswordValidator(password, confirmPassword) {
	if (!confirmPassword) return 'Please fill in this field.'
	if (confirmPassword !== password) return 'Passwords do not match.'
	return ''
}
