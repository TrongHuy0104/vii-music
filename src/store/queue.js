import { create } from 'zustand'

export const useQueueStore = create()((set) => ({
	activeQueueId: null,
	currentTrackId: null,
	playlists: [],
	setActiveQueueId: (id) => set({ activeQueueId: id }),
	setCurrentTrackId: (id) => set({ currentTrackId: id }),
	setPlaylists: (playlists) => set({ playlists }),
}))

export const useQueue = () => useQueueStore((state) => state)
