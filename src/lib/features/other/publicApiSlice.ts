import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {
  Albums,
  Artist,
  Artists,
  DetailAlbum,
  DetailPlaylist,
  DetailTrack, Genre, Genres,
  Playlists, RecentlyListenTracks, ShortUser,
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
      query: ({page = 1, userId = '', genreSlug= ''}) =>
        `/playlists/?page=${page}&user__id=${userId}&genre__slug=${genreSlug}`,
    }),
    retrievePlaylist: builder.query<DetailPlaylist, string>({
      query: (slug) => `/playlists/${slug}/`,
    }),
    listRecentlyListenTracks: builder.query<RecentlyListenTracks, any | void>({
      query: ({page = 1, userId}) =>
        `/tracks/recently/user/${userId}/?page=${page}`,
    }),
    listUserFollowers: builder.query<ShortUser[], any | void>({
      query: ({userId}) =>
        `/auth/users/${userId}/followers/`,
    }),
    listUserFollowing: builder.query<ShortUser[], any | void>({
      query: ({userId}) =>
        `/auth/users/${userId}/following/`,
    }),
    listGenres: builder.query<Genres, any | void>({
      query: ({page = 1}) =>
        `/others/genres/?page=${page}`,
    }),
    retrieveGenre: builder.query<Genre, string>({
      query: (slug) => `/others/genres/${slug}/`,
    }),
  })
})


export const {
  useListUserQuery,
  useListUserFollowersQuery,
  useListUserFollowingQuery,
  useRetrieveUserQuery,
  useListArtistQuery,
  useRetrieveArtistQuery,
  useListAlbumQuery,
  useRetrieveAlbumQuery,
  useListTrackQuery,
  useRetrieveTrackQuery,
  useListPlaylistQuery,
  useRetrievePlaylistQuery,
  useListRecentlyListenTracksQuery,
  useListGenresQuery,
  useRetrieveGenreQuery,
} = publicApiSlice