import { useQuery } from '@tanstack/react-query'
import { getSongInfo } from '../../api'
import { useLastActiveTrack } from '../../hooks/useLastActiveTrack'
import { useQueue } from '../../store/queue'

function useSongInfo() {
	const lastActiveTrack = useLastActiveTrack()
	const { currentTrackId } = useQueue()
	const displayTrack = currentTrackId || lastActiveTrack?.encodeId

	const { isPending: isLoadingSongInfo, data } = useQuery({
		queryKey: ['currentSong', displayTrack],
		queryFn: () => getSongInfo(displayTrack),
	})

	const songInfo = data?.songInfo?.data
	const song = data?.songAudio?.data

	return { songInfo, isLoadingSongInfo, song }
}

export default useSongInfo
