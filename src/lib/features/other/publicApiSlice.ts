import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {Album, Albums, Artist, Artists, DetailPlaylist, Playlist, Playlists, Track, Tracks} from "@/types/types";


const publicApiSlice = apiPublicSlice.injectEndpoints({
  endpoints: builder => ({
    listArtist: builder.query<Artists, void>({
      query: () =>
        `/artists/`,
    }),
    retrieveArtist: builder.query<Artist, string>({
      query: (slug) => `/artists/${slug}/`,
    }),
    listAlbum: builder.query<Albums, any | void>({
      query: ({page = 1, artistSlug = ''}) =>
        `/albums/?page=${page}&artist__slug=${artistSlug}`,
    }),
    retrieveAlbum: builder.query<Album, string>({
      query: (slug) => `/albums/${slug}/`,
    }),
    listTrack: builder.query<Tracks, any | void>({
      query: ({page = 1, artistSlug = ''}) =>
        `/tracks/?page=${page}&artist__slug=${artistSlug}`,
    }),
    retrieveTrack: builder.query<Track, string>({
      query: (slug) => `/tracks/${slug}/`,
    }),
    listPlaylist: builder.query<Playlists, void>({
      query: () =>
        `/playlists/`,
    }),
    retrievePlaylist: builder.query<DetailPlaylist, string>({
      query: (slug) => `/playlists/${slug}/`,
    }),
  })
})


export const {
  useListArtistQuery,
  useRetrieveArtistQuery,
  useListAlbumQuery,
  useRetrieveAlbumQuery,
  useListTrackQuery,
  useRetrieveTrackQuery,
  useListPlaylistQuery,
  useRetrievePlaylistQuery,
} = publicApiSlice