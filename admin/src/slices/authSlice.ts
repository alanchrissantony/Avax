import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLoginAdmin } from '@/api/api';
import { AuthState, LoginData } from '@/types/user';

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    admin: null,
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
            const { access, refresh, user } = action.payload;
            state.accessToken = access;
            state.refreshToken = refresh;
            state.admin = user;
        },
        setAccessToken: (state, action) => {
            const { access } = action.payload;
            state.accessToken = access;
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.admin = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                console.log("action", action);
                
                authSlice.caseReducers.setCredentials(state, action);
                state.status = "succeeded";
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});


export default authSlice.reducer;
export const { setCredentials, setAccessToken, logout } = authSlice.actions;