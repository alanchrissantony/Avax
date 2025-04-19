import {apiSlice} from "@/lib/services/apiSlice";
import {Artist, ArtistsLiked} from "@/types/types";


const artistApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserArtistLiked: builder.query<ArtistsLiked, any | void>({
      query: ({page = 1,}) => `/artists/favorite/?page=${page}`,
      providesTags: ['Artist']
    }),
    artistAddFavorite: builder.mutation({
      query: ({artistSlug}) => ({
        url: `/artists/${artistSlug}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: ['Artist'],
    }),
    artistRemoveFavorite: builder.mutation({
      query: ({artistSlug}) => ({
        url: `/artists/${artistSlug}/favorite/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Artist'],
    }),
    retrieveMeArtist: builder.query<Artist, void>({
      query: () => `/artists/me/`,
      providesTags: ['Artist']
    }),
  }),
});

export const {
  useListUserArtistLikedQuery,
  useArtistAddFavoriteMutation,
  useArtistRemoveFavoriteMutation,
  useRetrieveMeArtistQuery,
} = artistApiSlice