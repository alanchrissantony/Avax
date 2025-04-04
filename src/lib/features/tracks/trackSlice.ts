import {createSlice} from "@reduxjs/toolkit";
import {Track} from "@/types/types";

interface TrackState {
  currentTrack: Track | null;
  isLoading: boolean;
}


const initialState = {
  currentTrack: null,
  isLoading: true,
} as TrackState;

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    finishInitialLoad: state => {
      state.isLoading = false;
    }
  },
});

export const {setCurrentTrack, finishInitialLoad,} = trackSlice.actions;
export default trackSlice.reducer;