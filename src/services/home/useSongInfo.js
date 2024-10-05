import { useQuery } from '@tanstack/react-query'
import { getSongInfo } from '../../api'

function useSongInfo(id) {
	const { isPending: isLoadingSongInfo, data } = useQuery({
		queryKey: ['currentSong', id],
		queryFn: () => getSongInfo(id),
	})

	const songInfo = data?.dataSongDetail?.data
	const song = data?.dataSong?.data
	return { songInfo, isLoadingSongInfo, song }
}

export default useSongInfo
