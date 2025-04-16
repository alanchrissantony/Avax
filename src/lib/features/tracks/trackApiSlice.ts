import {apiSlice} from "@/lib/services/apiSlice";
import {Tracks} from "@/types/types";


const trackApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserTracksLiked: builder.query<Tracks, any | void>({
      query: ({page = 1,}) => `/tracks/liked/?page=${page}`,
      providesTags: ['Track']
    }),
  }),
});

export const {
  useListUserTracksLikedQuery,
} = trackApiSlice