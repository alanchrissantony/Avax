import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRegisterUser, apiLoginUser, apiVerifyUser, apiResetPassUser } from '@/api/api';
import { AuthState, RegisterData, LoginData, VerifyData, ResetData } from '@/types/user';

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    artist: null,
    status: "idle",
    error: null,
};

// Async thunks
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data: RegisterData, { rejectWithValue }) => {
        try {
            const response = await apiRegisterUser(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || "Failed to register");
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data: LoginData, { rejectWithValue }) => {
        try {
            const response = await apiLoginUser(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || "Failed to login");
        }
    }
);

export const verifyUser = createAsyncThunk(
    "auth/verifyUser",
    async (data: VerifyData, { rejectWithValue }) => {
        try {
            const response = await apiVerifyUser(data);
            return response;
        } catch (error: any) {            
            return rejectWithValue(error.response?.data?.detail || "Failed to verify");
        }
    }
);

export const resetPassUser = createAsyncThunk(
    "auth/resetPassUser",
    async (data: ResetData, { rejectWithValue }) => {
        try {
            const response = await apiResetPassUser(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || "Failed to reset password");
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log(action.payload);
            
            const { access, refresh, user } = action.payload;
            state.accessToken = access;
            state.refreshToken = refresh;
            state.artist = user;
        },
        setAccessToken: (state, action) => {
            const { access } = action.payload;
            state.accessToken = access;
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.artist = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(resetPassUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(resetPassUser.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(resetPassUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(verifyUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(verifyUser.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                authSlice.caseReducers.setCredentials(state, action);
                state.status = "succeeded";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});


export default authSlice.reducer;
export const { setCredentials, setAccessToken, logout } = authSlice.actions;
