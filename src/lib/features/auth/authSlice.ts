import {createSlice} from "@reduxjs/toolkit";
import {User} from "@/types/types";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoadingUser: boolean;
  user: User | null;
}


const initialState = {
  isAuthenticated: false,
  isLoading: true,
  isLoadingUser: false,
  user: null,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: state => {
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
    finishInitialLoad: state => {
      state.isLoading = false;
    },
    startInitialLoadUser: state => {
      state.isLoadingUser = true;
    },
    finishInitialLoadUser: state => {
      state.isLoadingUser = false;
    }
  },
});

export const {
  setAuth,
  setUser,
  logout,
  finishInitialLoad,
  startInitialLoadUser,
  finishInitialLoadUser,
} = authSlice.actions;
export default authSlice.reducer;