import {apiSlice} from "@/lib/services/apiSlice";
import {DetailTrack, ListDetailTracks, Tracks, UpdateTrack} from "@/types/types";


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
    listMyTracks: builder.query<ListDetailTracks, any>({
      query: ({page = 1}) => `/tracks/my/?page=${page}`,
      providesTags: ['Track']
    }),
    retrieveMyTrack: builder.query<DetailTrack, any>({
      query: ({slug}) => `/albums/my/${slug}/`,
      providesTags: ['Track']
    }),
    postMyTrack: builder.mutation<DetailTrack, any>({
      query: (data) => ({
        url: `/tracks/my/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Track'],
    }),
    updateMyTrack: builder.mutation<UpdateTrack, { slug: string | undefined, data: any }>({
      query: ({slug, data}) => ({
        url: `/tracks/my/${slug}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Track'],
    }),
    deleteMyTrack: builder.mutation({
      query: ({slug}) => ({
        url: `/tracks/my/${slug}/`,
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
  useListMyTracksQuery,
  usePostMyTrackMutation,
  useUpdateMyTrackMutation,
  useRetrieveMyTrackQuery,
  useDeleteMyTrackMutation,
} = trackApiSlice