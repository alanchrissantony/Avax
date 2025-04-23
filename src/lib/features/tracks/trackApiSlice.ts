import {apiSlice} from "@/lib/services/apiSlice";
import {DetailTrack, ListDetailTracks, Tracks} from "@/types/types";


const trackApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserTracksLiked: builder.query<Tracks, any | void>({
      query: ({page = 1, page_size = 1000}) => `/tracks/liked/?page=${page}&page_size=${page_size}`,
      providesTags: ['MyTrack']
    }),
    TrackAddFavorite: builder.mutation({
      query: ({trackSlug}) => ({
        url: `/tracks/${trackSlug}/like/`,
        method: 'POST',
      }),
      invalidatesTags: ['MyTrack'],
    }),
    TrackRemoveFavorite: builder.mutation({
      query: ({trackSlug}) => ({
        url: `/tracks/${trackSlug}/like/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyTrack'],
    }),
    listMyTracks: builder.query<ListDetailTracks, any>({
      query: ({page = 1}) => `/tracks/my/?page=${page}`,
      providesTags: ['MyTrack']
    }),
    retrieveMyTrack: builder.query<DetailTrack, any>({
      query: ({slug}) => `/tracks/my/${slug}/`,
      providesTags: ['MyTrack']
    }),
    postMyTrack: builder.mutation<DetailTrack, any>({
      query: (data) => ({
        url: `/tracks/my/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MyTrack'],
    }),
    updateMyTrack: builder.mutation<DetailTrack, { slug: string | undefined, data: any }>({
      query: ({slug, data}) => ({
        url: `/tracks/my/${slug}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['MyTrack'],
    }),
    deleteMyTrack: builder.mutation({
      query: ({slug}) => ({
        url: `/tracks/my/${slug}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyTrack'],
    }),
  }),
});

export const {
  useListUserTracksLikedQuery,
  useTrackAddFavoriteMutation,
  useTrackRemoveFavoriteMutation,
  useListMyTracksQuery,
  usePostMyTrackMutation,
  useUpdateMyTrackMutation,
  useRetrieveMyTrackQuery,
  useDeleteMyTrackMutation,
} = trackApiSlice