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
      query: ({}) => `/auth/users/`,
      providesTags: ["User"],
    }),
    retrieveUser: builder.query<User, number>({
      query: (id) => `/auth/users/${id}/`,
      providesTags: ["User"],
    }),
    listArtist: builder.query<Artists, any | void>({
      query: ({page = 1, search = ''}) =>
        `/artists/?page=${page}&search=${search}`,
      providesTags: ["Artist"],
    }),
    retrieveArtist: builder.query<Artist, string>({
      query: (slug) => `/artists/${slug}/`,
      providesTags: ["Artist"],
    }),
    listAlbum: builder.query<Albums, any | void>({
      query: ({page = 1, search = '', artistSlug = ''}) =>
        `/albums/?page=${page}&search=${search}&artist__slug=${artistSlug}`,
      providesTags: ["Album"],
    }),
    retrieveAlbum: builder.query<DetailAlbum, string | null>({
      query: (slug) => `/albums/${slug}/`,
      providesTags: ["Album"],
    }),
    listTrack: builder.query<Tracks, any | void>({
      query: ({page = 1, search = '', artistSlug = '', genreSlug = '', albumSlug = ''}) =>
        `/tracks/?page=${page}&search=${search}&artist__slug=${artistSlug}&genre__slug=${genreSlug}&album__slug=${albumSlug}`,
      providesTags: ["Track"],
    }),
    retrieveTrack: builder.query<DetailTrack, string | null>({
      query: (slug) => `/tracks/${slug}/`,
      providesTags: ["Track"],
    }),
    listPlaylist: builder.query<Playlists, any | void>({
      query: ({page = 1, search = '', userId = '', genreSlug = ''}) =>
        `/playlists/?page=${page}&search=${search}&user__id=${userId}&genre__slug=${genreSlug}`,
      providesTags: ["Playlist"],
    }),
    retrievePlaylist: builder.query<DetailPlaylist, string>({
      query: (slug) => `/playlists/${slug}/`,
      providesTags: ["Playlist"],
    }),
    listRecentlyListenTracks: builder.query<RecentlyListenTracks, any | void>({
      query: ({page = 1, userId}) =>
        `/tracks/recently/user/${userId}/?page=${page}`,
      providesTags: ["Track"],
    }),
    listUsersProfile: builder.query<ShortUsers, any | void>({
      query: ({page = 1, search = ''}) =>
        `/users/profiles/?page=${page}&search=${search}`,
      providesTags: ["User"],
    }),
    listUserFollowers: builder.query<ShortUser[], any | void>({
      query: ({userId}) =>
        `/users/${userId}/followers/`,
      providesTags: ["User"],
    }),
    listUserFollowing: builder.query<ShortUser[], any | void>({
      query: ({userId}) =>
        `/users/${userId}/following/`,
      providesTags: ["User"],
    }),
    listGenres: builder.query<Genres, any | void>({
      query: ({page = 1}) =>
        `/others/genres/?page=${page}`,
      providesTags: ["Genre"],
    }),
    retrieveGenre: builder.query<Genre, string>({
      query: (slug) => `/others/genres/${slug}/`,
      providesTags: ["Genre"],
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