import { create } from 'zustand'

export const useQueueStore = create()((set) => ({
	activeQueueId: null,
	currentTrackId: null,
	activeTab: '',
	playlists: [],
	setActiveQueueId: (id) => set({ activeQueueId: id }),
	setCurrentTrackId: (id) => set({ currentTrackId: id }),
	setPlaylists: (playlists) => set({ playlists }),
	setActiveTab: (tab) => set({ activeTab: tab }),
}))

export const useQueue = () => useQueueStore((state) => state)
