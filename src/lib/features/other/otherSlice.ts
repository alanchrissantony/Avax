import {createSlice} from "@reduxjs/toolkit";

interface OtherState {
  searchQuery: string;
}


const initialState = {
  searchQuery: "",
} as OtherState;

export const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {setSearchQuery,} = otherSlice.actions;
export default otherSlice.reducer;