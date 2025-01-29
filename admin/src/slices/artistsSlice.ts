import { apiFetchArtists, apiVerifyArtist } from "@/api/api";
import { ArtistState } from "@/types/artists";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ArtistState  = {
    artists: [],
    status: "idle",
    error: null,
}

export const fetchArtists = createAsyncThunk(
    "artists/fetchArtists",
    async (_, {rejectWithValue})=>{
        try {
            const response = await apiFetchArtists();
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || "Failed to fetch artists");
        }

    }
)

export const verifyArtist = createAsyncThunk(
    "artists/verifyArtist",
    async (email: string, {rejectWithValue})=>{
        try {
            const response = await apiVerifyArtist(email);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || "Failed to verify artist");
        }
    }
)


const artistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {
        setArtists: (state, action)=>{
            const { artists } = action.payload
            state.artists = artists
        },
        resetArtists: (state)=>{
            state.artists = []
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchArtists.pending, (state, action) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(fetchArtists.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.artists = action.payload
        })
        .addCase(fetchArtists.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload as string;
        })
        .addCase(verifyArtist.pending, (state, action) => {
            state.status = "loading"
            state.error = null
        })
        .addCase(verifyArtist.fulfilled, (state, action) => {            
            state.status = "succeeded"
            state.artists = action.payload
        })
        .addCase(verifyArtist.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload as string;
        })
    }
})


export default artistsSlice.reducer;
export const { setArtists, resetArtists } = artistsSlice.actions;