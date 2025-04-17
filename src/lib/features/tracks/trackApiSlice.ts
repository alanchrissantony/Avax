import {apiSlice} from "@/lib/services/apiSlice";
import {Tracks} from "@/types/types";


const trackApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserTracksLiked: builder.query<Tracks, any | void>({
      query: ({page = 1, page_size = 1000}) => `/tracks/liked/?page=${page}&page_size=${page_size}`,
      providesTags: ['Track']
    }),
    TrackAddFavorite: builder.mutation({
      query: ({trackSlug}) => ({
        url: `/tracks/${trackSlug}/like/`,
        method: 'POST',
      }),
      invalidatesTags: ['Track'],
    }),
    TrackRemoveFavorite: builder.mutation({
      query: ({trackSlug}) => ({
        url: `/tracks/${trackSlug}/like/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Track'],
    }),
  }),
});

export const {
  useListUserTracksLikedQuery,
  useTrackAddFavoriteMutation,
  useTrackRemoveFavoriteMutation,
} = trackApiSlice