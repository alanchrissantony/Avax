import {apiSlice} from "@/lib/services/apiSlice";
import {Artist, ListDetailTracks, Tracks} from "@/types/types";


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
    listArtistMyTracks: builder.query<ListDetailTracks, any | void>({
      query: ({page = 1}) => `/tracks/my/?page=${page}`,
      providesTags: ['Track']
    }),
  }),
});

export const {
  useListUserTracksLikedQuery,
  useTrackAddFavoriteMutation,
  useTrackRemoveFavoriteMutation,
  useListArtistMyTracksQuery,
} = trackApiSlice