import {apiSlice} from "@/lib/services/apiSlice";
import {AlbumsLiked, DetailAlbum, ListDetailAlbums, UpdateAlbum} from "@/types/types";


const albumApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserAlbumLiked: builder.query<AlbumsLiked, any | void>({
      query: ({page = 1,}) => `/albums/favorite/?page=${page}`,
      providesTags: ['Album']
    }),
    albumAddFavorite: builder.mutation({
      query: ({albumSlug}) => ({
        url: `/albums/${albumSlug}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: ['Album'],
    }),
    albumRemoveFavorite: builder.mutation({
      query: ({albumSlug}) => ({
        url: `/albums/${albumSlug}/favorite/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Album'],
    }),
    listMyAlbum: builder.query<ListDetailAlbums, any | void>({
      query: ({page = 1, search = ''}) => `/albums/my/?page=${page}&search=${search}`,
      providesTags: ['Album']
    }),
    retrieveMyAlbum: builder.query<DetailAlbum, any | void>({
      query: ({slug}) => `/albums/my/${slug}/`,
      providesTags: ['Album']
    }),
    postMyAlbum: builder.mutation<DetailAlbum, any | void>({
      query: (data) => ({
        url: `/albums/my/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Album'],
    }),
    updateMyAlbum: builder.mutation<UpdateAlbum, any | void>({
      query: ({slug, data}) => ({
        url: `/albums/my/${slug}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Album'],
    }),
    deleteMyAlbum: builder.mutation({
      query: ({slug}) => ({
        url: `/albums/my/${slug}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Album'],
    }),
  }),
});

export const {
  useListUserAlbumLikedQuery,
  useAlbumAddFavoriteMutation,
  useAlbumRemoveFavoriteMutation,
  useListMyAlbumQuery,
  usePostMyAlbumMutation,
  useRetrieveMyAlbumQuery,
  useUpdateMyAlbumMutation,
  useDeleteMyAlbumMutation,
} = albumApiSlice