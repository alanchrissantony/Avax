import {apiSlice} from "@/lib/services/apiSlice";
import {ArtistsLiked} from "@/types/types";


const artistApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserArtistLiked: builder.query<ArtistsLiked, any | void>({
      query: ({page = 1,}) => `/artists/favorite/?page=${page}`,
      providesTags: ['Artist']
    }),
  }),
});

export const {
  useListUserArtistLikedQuery,
} = artistApiSlice