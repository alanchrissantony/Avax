import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {Albums, Artist, Artists} from "@/types/types";


const publicApiSlice = apiPublicSlice.injectEndpoints({
  endpoints: builder => ({
    listArtist: builder.query<Artists, void>({
      query: () =>
        `/artists/`,
    }),
    retrieveArtist: builder.query<Artist, string>({
      query: (slug) => `/artists/${slug}/`,
    }),
    listAlbum: builder.query<Albums, void>({
      query: () =>
        `/albums/`,
    }),
    retrieveAlbum: builder.query<Albums, string>({
      query: (slug) => `/albums/${slug}/`,
    }),
  })
})


export const {
  useListArtistQuery,
  useRetrieveArtistQuery,
  useListAlbumQuery,
  useRetrieveAlbumQuery,
} = publicApiSlice