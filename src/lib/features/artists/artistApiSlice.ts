import {apiSlice} from "@/lib/services/apiSlice";
import {Artist, ArtistsLiked, License, UpdateLicense} from "@/types/types";


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
    updateMeArtist: builder.mutation<Artist, any>({
      query: (body) => ({
        url: `/artists/me/`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Artist'],
    }),
    deleteMeArtist: builder.mutation<Artist, any>({
      query: () => ({
        url: `/artists/me/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Artist'],
    }),
    listMeArtistLicense: builder.query<License[], any>({
      query: ({}) => `/artists/me/license/`,
      providesTags: ['Artist']
    }),
    postMeArtistLicense: builder.mutation<License, { body: UpdateLicense }>({
      query: ({body}) => ({
        url: `/artists/me/license/`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Artist'],
    }),
    retrieveMeArtistLicense: builder.query<License, any>({
      query: ({id}) => `/artists/me/license/${id}`,
      providesTags: ['Artist']
    }),
    updateMeArtistLicense: builder.mutation<License, { id: number | undefined, body: UpdateLicense }>({
      query: ({id, body}) => ({
        url: `/artists/me/license/${id}/`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Artist'],
    }),
    deleteMeArtistLicense: builder.mutation<License, any>({
      query: ({id}) => ({
        url: `/artists/me/license/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Artist'],
    }),
  }),
});

export const {
  useListUserArtistLikedQuery,
  useArtistAddFavoriteMutation,
  useArtistRemoveFavoriteMutation,
  useRetrieveMeArtistQuery,
  useUpdateMeArtistMutation,
  useDeleteMeArtistMutation,
  useListMeArtistLicenseQuery,
  usePostMeArtistLicenseMutation,
  useRetrieveMeArtistLicenseQuery,
  useUpdateMeArtistLicenseMutation,
  useDeleteMeArtistLicenseMutation,
} = artistApiSlice