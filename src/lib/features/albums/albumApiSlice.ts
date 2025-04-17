import {apiSlice} from "@/lib/services/apiSlice";
import {AlbumsLiked} from "@/types/types";


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
  }),
});

export const {
  useListUserAlbumLikedQuery,
  useAlbumAddFavoriteMutation,
  useAlbumRemoveFavoriteMutation,
} = albumApiSlice