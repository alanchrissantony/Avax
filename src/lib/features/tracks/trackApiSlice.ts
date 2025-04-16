import {apiSlice} from "@/lib/services/apiSlice";
import {finishInitialLoadUser, setUser} from "@/lib/features/auth/authSlice";
import {Playlists, PlaylistsLiked, Tracks, User} from "@/types/types";


const trackApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserTracksLiked: builder.query<Tracks, any | void>({
      query: ({page = 1,}) => `/tracks/liked/?page=${page}`,
      providesTags: ['Track']
    }),
  }),
});

export const {
  useListUserTracksLikedQuery,
} = trackApiSlice