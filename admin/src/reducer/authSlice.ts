import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLoginAdmin } from '@/api/api';
import { AuthState, LoginData } from '@/types/user';

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    user: null,
    status: "idle",
    error: null,
};

// Async thunks

export const loginAdmin = createAsyncThunk(
    "auth/loginAdmin",
    async (data: LoginData, { rejectWithValue }) => {
        try {
            const response = await apiLoginAdmin(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || "Failed to login");
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, refreshToken, user } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.user = user;
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});


export default authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;