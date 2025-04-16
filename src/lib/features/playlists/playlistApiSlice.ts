import {apiSlice} from "@/lib/services/apiSlice";
import {Playlists, PlaylistsLiked} from "@/types/types";


const playlistApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserPlaylistLiked: builder.query<PlaylistsLiked, any | void>({
      query: ({page = 1,}) => `/playlists/favorite/?page=${page}`,
      providesTags: ['Playlist']
    }),
  }),
});

export const {
  useListUserPlaylistLikedQuery,
} = playlistApiSlice