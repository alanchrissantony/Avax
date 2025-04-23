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
      providesTags: ['MyPlaylist']
    }),
    playlistAddFavorite: builder.mutation({
      query: ({playlistSlug}) => ({
        url: `/playlists/${playlistSlug}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: ['MyPlaylist'],
    }),
    playlistRemoveFavorite: builder.mutation({
      query: ({playlistSlug}) => ({
        url: `/playlists/${playlistSlug}/favorite/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyPlaylist'],
    }),
    playlistAddTrack: builder.mutation({
      query: ({playlistSlug, trackSlug}) => ({
        url: `/playlists/${playlistSlug}/add/tracks/${trackSlug}/`,
        method: 'POST',
      }),
      invalidatesTags: ['MyPlaylist'],
    }),
    playlistRemoveTrack: builder.mutation({
      query: ({playlistSlug, trackSlug}) => ({
        url: `/playlists/${playlistSlug}/add/tracks/${trackSlug}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyPlaylist'],
    }),
    listMyPlaylist: builder.query<ListDetailPlaylist, any | void>({
      query: ({page = 1, search = ''}) => `/playlists/my/?page=${page}&search=${search}`,
      providesTags: ['MyPlaylist']
    }),
    retrieveMyPlaylist: builder.query<DetailPlaylist, any | void>({
      query: (slug) => `/playlists/my/${slug}/`,
      providesTags: ['MyPlaylist']
    }),
    postMyPlaylist: builder.mutation<DetailPlaylist, any>({
      query: (data) => ({
        url: `/playlists/my/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MyPlaylist'],
    }),
    updateMyPlaylist: builder.mutation<UpdatePlaylist, { slug: string | undefined, data: any }>({
      query: ({slug, data}) => ({
        url: `/playlists/my/${slug}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MyPlaylist'],
    }),
    deleteMyPlaylist: builder.mutation({
      query: ({slug}) => ({
        url: `/playlists/my/${slug}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyPlaylist'],
    }),
  }),
});

export const {
  useListUserPlaylistLikedQuery,
  usePlaylistAddFavoriteMutation,
  usePlaylistRemoveFavoriteMutation,
  usePlaylistAddTrackMutation,
  usePlaylistRemoveTrackMutation,
  useListMyPlaylistQuery,
  usePostMyPlaylistMutation,
  useRetrieveMyPlaylistQuery,
  useUpdateMyPlaylistMutation,
  useDeleteMyPlaylistMutation,
} = playlistApiSlice