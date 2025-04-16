import {apiSlice} from "@/lib/services/apiSlice";
import {Tracks} from "@/types/types";


const trackApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserTracksLiked: builder.query<Tracks, any | void>({
      query: ({page = 1, page_size = 1000}) => `/tracks/liked/?page=${page}&page_size=${page_size}`,
      providesTags: ['Track']
    }),
  }),
});

export const {
  useListUserTracksLikedQuery,
} = trackApiSlice