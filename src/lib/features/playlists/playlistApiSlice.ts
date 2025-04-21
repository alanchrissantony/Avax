import {apiSlice} from "@/lib/services/apiSlice";
import {
  DetailPlaylist,
  ListDetailPlaylist,
  PlaylistsLiked,
  UpdatePlaylist
} from "@/types/types";


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
    listMyPlaylist: builder.query<ListDetailPlaylist, any | void>({
      query: ({page = 1, search = ''}) => `/playlists/my/?page=${page}&search=${search}`,
      providesTags: ['Playlist']
    }),
    retrieveMyPlaylist: builder.query<DetailPlaylist, any | void>({
      query: (slug) => `/playlists/my/${slug}/`,
      providesTags: ['Playlist']
    }),
    postMyPlaylist: builder.mutation<DetailPlaylist, any>({
      query: (data) => ({
        url: `/playlists/my/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Playlist'],
    }),
    updateMyPlaylist: builder.mutation<UpdatePlaylist, { slug: string | undefined, data: any }>({
      query: ({slug, data}) => ({
        url: `/playlists/my/${slug}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Playlist'],
    }),
    deleteMyPlaylist: builder.mutation({
      query: ({slug}) => ({
        url: `/playlists/my/${slug}/`,
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
  useListMyPlaylistQuery,
  usePostMyPlaylistMutation,
  useRetrieveMyPlaylistQuery,
  useUpdateMyPlaylistMutation,
  useDeleteMyPlaylistMutation,
} = playlistApiSlice