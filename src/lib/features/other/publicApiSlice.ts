import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {
  Albums,
  Artist,
  Artists,
  DetailAlbum,
  DetailPlaylist,
  DetailTrack, Genre, Genres,
  Playlists, RecentlyListenTracks, ShortUser, ShortUsers,
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
      query: ({page = 1, search = ''}) =>
        `/artists/?page=${page}&search=${search}`,
    }),
    retrieveArtist: builder.query<Artist, string>({
      query: (slug) => `/artists/${slug}/`,
    }),
    listAlbum: builder.query<Albums, any | void>({
      query: ({page = 1, search = '', artistSlug = ''}) =>
        `/albums/?page=${page}&search=${search}&artist__slug=${artistSlug}`,
    }),
    retrieveAlbum: builder.query<DetailAlbum, string | null>({
      query: (slug) => `/albums/${slug}/`,
    }),
    listTrack: builder.query<Tracks, any | void>({
      query: ({page = 1, search = '', artistSlug = '', genreSlug = '', albumSlug = ''}) =>
        `/tracks/?page=${page}&search=${search}&artist__slug=${artistSlug}&genre__slug=${genreSlug}&album__slug=${albumSlug}`,
    }),
    retrieveTrack: builder.query<DetailTrack, string | null>({
      query: (slug) => `/tracks/${slug}/`,
    }),
    listPlaylist: builder.query<Playlists, any | void>({
      query: ({page = 1, search = '', userId = '', genreSlug = ''}) =>
        `/playlists/?page=${page}&search=${search}&user__id=${userId}&genre__slug=${genreSlug}`,
    }),
    retrievePlaylist: builder.query<DetailPlaylist, string>({
      query: (slug) => `/playlists/${slug}/`,
    }),
    listRecentlyListenTracks: builder.query<RecentlyListenTracks, any | void>({
      query: ({page = 1, userId}) =>
        `/tracks/recently/user/${userId}/?page=${page}`,
    }),
    listUsersProfile: builder.query<ShortUsers, any | void>({
      query: ({page = 1, search = ''}) =>
        `/users/profiles/?page=${page}&search=${search}`,
    }),
    listUserFollowers: builder.query<ShortUser[], any | void>({
      query: ({userId}) =>
        `/users/${userId}/followers/`,
    }),
    listUserFollowing: builder.query<ShortUser[], any | void>({
      query: ({userId}) =>
        `/users/${userId}/following/`,
    }),
    listGenres: builder.query<Genres, any | void>({
      query: ({page = 1}) =>
        `/others/genres/?page=${page}`,
    }),
    retrieveGenre: builder.query<Genre, string>({
      query: (slug) => `/others/genres/${slug}/`,
    }),
    downloadTrack: builder.query<any, string>({
      query: (slug) => `/tracks/${slug}/download/`,
    }),
  })
})


export const {
  useListUserQuery,
  useListUsersProfileQuery,
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
  useDownloadTrackQuery,
} = publicApiSlice