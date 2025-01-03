import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRegisterUser, apiLoginUser, apiVerifyUser, apiResetPassUser } from "@/api/api";
import { AuthState, RegisterData, LoginData, VerifyData, ResetData } from "@/types/user";

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    user: null,
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
            return rejectWithValue(error.response?.data?.message || "Failed to register");
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
            return rejectWithValue(error.response?.data?.message || "Failed to login");
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
            return rejectWithValue(error.response?.data?.message || "Failed to verify");
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
            return rejectWithValue(error.response?.data?.message || "Failed to reset password");
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
                state.status = "succeeded";
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
