import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {Artist, Artists} from "@/types/types";


const publicApiSlice = apiPublicSlice.injectEndpoints({
  endpoints: builder => ({
    listArtist: builder.query<Artists, void>({
      query: () =>
        `/artists/`,
    }),
    retrieveArtist: builder.query<Artist, string>({
      query: (slug) => `/artists/${slug}/`,
    }),
  })
})


export const {
  useListArtistQuery,
  useRetrieveArtistQuery,
} = publicApiSlice