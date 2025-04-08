import {createSlice} from "@reduxjs/toolkit";
import {Track} from "@/types/types";

interface TrackState {
  currentTracks: Track[] | null;
  activeTrack: Track | null;
  currentIndex: number;
  isLoading: boolean;
}


const initialState = {
  currentTracks: null,
  activeTrack: null,
  currentIndex: 0,
  isLoading: true,
} as TrackState;

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setCurrentTracks: (state, action) => {
      state.currentTracks = action.payload;
    },
    setActiveTrack: (state, action) => {
      state.activeTrack = action.payload.track;
      state.currentTracks = action.payload.tracks;
      state.currentIndex = action.payload.i;
    },
    nextSong: (state, action) => {
      if (state.currentTracks?.[action.payload]) {
        state.activeTrack = state.currentTracks[action.payload];
        state.currentIndex = action.payload;
      }
    },

    prevSong: (state, action) => {
      if (state.currentTracks?.[action.payload]) {
        state.activeTrack = state.currentTracks[action.payload];
        state.currentIndex = action.payload;
      }
    },
    finishInitialLoad: state => {
      state.isLoading = false;
    }
  },
});

export const {setCurrentTracks, setActiveTrack, prevSong, nextSong, finishInitialLoad,} = trackSlice.actions;
export default trackSlice.reducer;