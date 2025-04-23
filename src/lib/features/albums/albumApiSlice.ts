import {apiSlice} from "@/lib/services/apiSlice";
import {AlbumsLiked, DetailAlbum, ListDetailAlbums, UpdateAlbum} from "@/types/types";


const albumApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserAlbumLiked: builder.query<AlbumsLiked, any | void>({
      query: ({page = 1,}) => `/albums/favorite/?page=${page}`,
      providesTags: ['MyAlbum']
    }),
    albumAddFavorite: builder.mutation({
      query: ({albumSlug}) => ({
        url: `/albums/${albumSlug}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: ['MyAlbum'],
    }),
    albumRemoveFavorite: builder.mutation({
      query: ({albumSlug}) => ({
        url: `/albums/${albumSlug}/favorite/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyAlbum'],
    }),
    listMyAlbum: builder.query<ListDetailAlbums, any | void>({
      query: ({page = 1, search = ''}) => `/albums/my/?page=${page}&search=${search}`,
      providesTags: ['MyAlbum']
    }),
    retrieveMyAlbum: builder.query<DetailAlbum, any | void>({
      query: ({slug}) => `/albums/my/${slug}/`,
      providesTags: ['MyAlbum']
    }),
    postMyAlbum: builder.mutation<DetailAlbum, any>({
      query: (data) => ({
        url: `/albums/my/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MyAlbum'],
    }),
    updateMyAlbum: builder.mutation<UpdateAlbum, {slug: string | undefined, data: any}>({
      query: ({slug, data}) => ({
        url: `/albums/my/${slug}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MyAlbum'],
    }),
    deleteMyAlbum: builder.mutation({
      query: ({slug}) => ({
        url: `/albums/my/${slug}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyAlbum'],
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