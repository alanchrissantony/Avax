import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {
  Albums,
  Artist,
  Artists,
  DetailAlbum,
  DetailPlaylist,
  DetailTrack,
  Playlists,
  Tracks, User
} from "@/types/types";


const publicApiSlice = apiPublicSlice.injectEndpoints({
  endpoints: builder => ({
    listUser: builder.query<User[], any | void>({
      query: ({}) =>
        `/auth/users/`,
    }),
    retrieveUser: builder.query<User, number>({
      query: (id) => `/auth/users/${id}/`,
    }),
    listArtist: builder.query<Artists, any | void>({
      query: ({}) =>
        `/artists/`,
    }),
    retrieveArtist: builder.query<Artist, string>({
      query: (slug) => `/artists/${slug}/`,
    }),
    listAlbum: builder.query<Albums, any | void>({
      query: ({page = 1, artistSlug = ''}) =>
        `/albums/?page=${page}&artist__slug=${artistSlug}`,
    }),
    retrieveAlbum: builder.query<DetailAlbum, string>({
      query: (slug) => `/albums/${slug}/`,
    }),
    listTrack: builder.query<Tracks, any | void>({
      query: ({page = 1, artistSlug = '', genreSlug = '', albumSlug = ''}) =>
        `/tracks/?page=${page}&artist__slug=${artistSlug}&genre__slug=${genreSlug}&album__slug=${albumSlug}`,
    }),
    retrieveTrack: builder.query<DetailTrack, string>({
      query: (slug) => `/tracks/${slug}/`,
    }),
    listPlaylist: builder.query<Playlists, any | void>({
      query: ({page = 1, userId = ''}) =>
        `/playlists/?page=${page}&user__id=${userId}`,
    }),
    retrievePlaylist: builder.query<DetailPlaylist, string>({
      query: (slug) => `/playlists/${slug}/`,
    }),
  })
})


export const {
  useListUserQuery,
  useRetrieveUserQuery,
  useListArtistQuery,
  useRetrieveArtistQuery,
  useListAlbumQuery,
  useRetrieveAlbumQuery,
  useListTrackQuery,
  useRetrieveTrackQuery,
  useListPlaylistQuery,
  useRetrievePlaylistQuery,
} = publicApiSlice