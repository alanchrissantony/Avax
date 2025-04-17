import {apiSlice} from "@/lib/services/apiSlice";
import {PlaylistsLiked} from "@/types/types";


const playlistApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserPlaylistLiked: builder.query<PlaylistsLiked, any | void>({
      query: ({page = 1,}) => `/playlists/favorite/?page=${page}`,
      providesTags: ['Playlist']
    }),
    playlistAddFavorite: builder.mutation({
      query: ({playlistSlug}) => ({
        url: `/playlists/${playlistSlug}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: ['Playlist'],
    }),
    playlistRemoveFavorite: builder.mutation({
      query: ({playlistSlug}) => ({
        url: `/playlists/${playlistSlug}/favorite/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Playlist'],
    }),
  }),
});

export const {
  useListUserPlaylistLikedQuery,
  usePlaylistAddFavoriteMutation,
  usePlaylistRemoveFavoriteMutation,
} = playlistApiSlice