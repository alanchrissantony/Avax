import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api/v1`,
  credentials: 'include',
})


export const apiPublicSlice = createApi({
  reducerPath: 'apiPublicSlice',
  baseQuery: baseQuery,
  tagTypes: ["User", "Artist", "Album", "Track", "Playlist", "Genre"],
  endpoints: builder => ({}),
});


