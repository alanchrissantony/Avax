import {apiSlice} from "@/lib/services/apiSlice";
import {Artist, ArtistsLiked, License, UpdateLicense} from "@/types/types";


const artistApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserArtistLiked: builder.query<ArtistsLiked, any | void>({
      query: ({page = 1,}) => `/artists/favorite/?page=${page}`,
      providesTags: ['MyArtist']
    }),
    artistAddFavorite: builder.mutation({
      query: ({artistSlug}) => ({
        url: `/artists/${artistSlug}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: ['MyArtist'],
    }),
    artistRemoveFavorite: builder.mutation({
      query: ({artistSlug}) => ({
        url: `/artists/${artistSlug}/favorite/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyArtist'],
    }),
    retrieveMeArtist: builder.query<Artist, any>({
      query: ({}) => `/artists/me/`,
      providesTags: ['MyArtist']
    }),
    updateMeArtist: builder.mutation<Artist, any>({
      query: (body) => ({
        url: `/artists/me/`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['MyArtist'],
    }),
    deleteMeArtist: builder.mutation<Artist, any>({
      query: () => ({
        url: `/artists/me/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyArtist'],
    }),
    listMeArtistLicense: builder.query<License[], any>({
      query: ({}) => `/artists/me/license/`,
      providesTags: ['MyArtist']
    }),
    postMeArtistLicense: builder.mutation<License, { body: UpdateLicense }>({
      query: ({body}) => ({
        url: `/artists/me/license/`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['MyArtist'],
    }),
    retrieveMeArtistLicense: builder.query<License, any>({
      query: ({id}) => `/artists/me/license/${id}`,
      providesTags: ['MyArtist']
    }),
    updateMeArtistLicense: builder.mutation<License, { id: number | undefined, body: UpdateLicense }>({
      query: ({id, body}) => ({
        url: `/artists/me/license/${id}/`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['MyArtist'],
    }),
    deleteMeArtistLicense: builder.mutation<License, any>({
      query: ({id}) => ({
        url: `/artists/me/license/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyArtist'],
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