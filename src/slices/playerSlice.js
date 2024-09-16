import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isPlaying: false,
}

const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		toggle(state) {
			state.isPlaying = !state.isPlaying
		},
		play(state) {
			state.isPlaying = true
		},
		pause(state) {
			state.isPlaying = false
		},
	},
})

export const { toggle, play, pause } = playerSlice.actions
export default playerSlice.reducer
