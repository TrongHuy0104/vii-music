import axios from '../utils/axios'

export async function getHome() {
	const data = await axios.get('/home')
	// console.log(data)
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
