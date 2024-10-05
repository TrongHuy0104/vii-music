import axios from 'axios'

const API_URL = 'https://zingmp3-api-pxgj.onrender.com/api/newreleasechart'

export const fetchNewReleases = async () => {
	try {
		const response = await axios.get(API_URL)
		return response.data.data.items || []
	} catch (error) {
		console.error('Error fetching new releases:', error.message)
		return []
	}
}
