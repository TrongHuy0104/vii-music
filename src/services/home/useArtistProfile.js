import { useQuery } from '@tanstack/react-query'
import { getDetailArtist } from '../../api/index'

function useArtistProfile(artistName) {
	const { isLoading: isLoadingArtist, data } = useQuery({
		queryKey: ['artist', artistName],
		queryFn: () => getDetailArtist(artistName), // Gọi hàm getDetailArtist
	})

	// Lấy dữ liệu nghệ sĩ từ response
	const artist = data?.data // Truy cập vào response.data.data (dữ liệu thực tế của artist)

	console.log('Artist data1:', artist)

	return { isLoadingArtist, artist }
}

export default useArtistProfile
