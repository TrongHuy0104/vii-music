import axios from '../utils/axios'

const fetchAudio = async (pId) => {
	let songAudio
	let isSuccess = false

	while (!isSuccess) {
		try {
			const response = await axios.get('/song', {
				params: { id: pId },
				method: 'get',
			})

			// Check if the response contains the error code
			if (response.data.err) {
				const retryUrl = response.data.url // Get the retry URL
				songAudio = await axios.get(retryUrl)

				// Check if the new response is successful
				if (!songAudio.data.err) {
					isSuccess = true // Break the loop when real audio data is retrieved
				}
			} else {
				// Handle successful initial response
				isSuccess = true
				songAudio = response
			}
		} catch (error) {
			console.error('Error fetching audio data:', error.message)
			throw error // Exit if an unexpected error occurs
		}
	}

	return songAudio
}

export async function getHome() {
	const data = await axios.get('/home')
	// fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
	if (!data.statusText === 'OK') throw Error('Failed getting home data')
	return data
}

export async function getDetailPlaylist(pId) {
	const data = await axios.get('/detailplaylist', {
		params: { id: pId },
		method: 'get',
	})
	if (!data.statusText === 'OK') throw Error('Failed getting playlist data')
	return data
}

export async function getSongInfo(pId) {
	const songInfo = await axios.get('/infosong', {
		params: { id: pId },
		method: 'get',
	})
	const songAudio = await fetchAudio(pId)

	return { songInfo, songAudio }
}

export async function getSongAudio(pId) {
	const songAudio = await fetchAudio(pId)

	return { songAudio }
}

export async function getDetailArtist(artistName) {
	try {
		const response = await axios.get('/artist', {
			params: { name: artistName },
		})

		// Kiểm tra mã trạng thái HTTP
		if (response.status !== 200) {
			throw new Error('Failed getting artist profile data')
		}

		// Trả về dữ liệu thực từ API (response.data.data)
		return response.data
	} catch (error) {
		console.error('Error fetching artist data:', error.message)
		throw error
	}
}
