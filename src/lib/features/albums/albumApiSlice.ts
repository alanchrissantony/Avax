import {apiSlice} from "@/lib/services/apiSlice";
import {finishInitialLoadUser, setUser} from "@/lib/features/auth/authSlice";
import {Playlists, PlaylistsLiked, User} from "@/types/types";


const albumApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserPlaylistLiked: builder.query<PlaylistsLiked, any | void>({
      query: ({page = 1,}) => `/playlists/favorite/?page=${page}`,
      providesTags: ['Playlist']
    }),
  }),
});

export const {
  useListUserPlaylistLikedQuery,
} = albumApiSlice