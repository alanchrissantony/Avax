import {configureStore} from '@reduxjs/toolkit'
import {apiSlice} from "@/lib/services/apiSlice";
import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import authReducer from "@/lib/features/auth/authSlice";
import trackReducer from "@/lib/features/tracks/trackSlice";
import otherReducer from "@/lib/features/other/otherSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      [apiPublicSlice.reducerPath]: apiPublicSlice.reducer,
      auth: authReducer,
      track: trackReducer,
      other: otherReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(
        apiSlice.middleware,
        apiPublicSlice.middleware,
      ),
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']