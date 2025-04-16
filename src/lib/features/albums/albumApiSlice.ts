import {apiSlice} from "@/lib/services/apiSlice";
import {AlbumsLiked} from "@/types/types";


const albumApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUserAlbumLiked: builder.query<AlbumsLiked, any | void>({
      query: ({page = 1,}) => `/albums/favorite/?page=${page}`,
      providesTags: ['Album']
    }),
  }),
});

export const {
  useListUserAlbumLikedQuery,
} = albumApiSlice