import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {Album, Albums, Artist, Artists, Playlist, Playlists, Track, Tracks} from "@/types/types";


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
    retrieveAlbum: builder.query<Album, string>({
      query: (slug) => `/albums/${slug}/`,
    }),
    listTrack: builder.query<Tracks, void>({
      query: () =>
        `/tracks/`,
    }),
    retrieveTrack: builder.query<Track, string>({
      query: (slug) => `/tracks/${slug}/`,
    }),
    listPlaylist: builder.query<Playlists, void>({
      query: () =>
        `/playlists/`,
    }),
    retrievePlaylist: builder.query<Playlist, string>({
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