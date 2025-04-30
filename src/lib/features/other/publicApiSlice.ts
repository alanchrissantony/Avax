import {apiPublicSlice} from "@/lib/services/apiPublicSlice";
import {
  Albums,
  Artist,
  Artists,
  DetailAlbum,
  DetailPlaylist,
  DetailTrack, Genre, Genres,
  Playlists, RecentlyListenTracks, Subscription,
  Tracks,
} from "@/types/types";


const publicApiSlice = apiPublicSlice.injectEndpoints({
  endpoints: builder => ({
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
      query: ({page = 1, search = '', artistSlug = '', genreSlug = '', albumSlug = '', ordering = '-plays_count'}) =>
        `/tracks/?page=${page}&search=${search}&ordering=${ordering}&artist__slug=${artistSlug}&genre__slug=${genreSlug}&album__slug=${albumSlug}`,
      providesTags: ["Track"],
    }),
    retrieveTrack: builder.query<DetailTrack, string | null>({
      query: (slug) => `/tracks/${slug}/`,
      providesTags: ["Track"],
    }),
    retrieveListenTrack: builder.query<any, any>({
      query: ({slug}) => ({
        url: `/tracks/${slug}/listen/`,
        responseHandler: (response) => response.blob(),
      }),
      providesTags: ["Track"],
      transformResponse: async (response) => {
        // @ts-ignore
        const text = await response.text();
        console.log("Blob response text:", text);
        // @ts-ignore
        return {track_url: URL.createObjectURL(response)};
      },
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
    listRecentlyMyListenTracks: builder.query<RecentlyListenTracks, any | void>({
      query: ({page = 1}) =>
        `/tracks/recently/my/?page=${page}`,
      providesTags: ["Track"],
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
    listSubscription: builder.query<Subscription[], any | void>({
      query: ({}) => `/subscriptions/`,
      providesTags: ["Subscription"],
    }),
    retrieveSubscription: builder.query<Subscription, number>({
      query: (id) => `/subscriptions/${id}/`,
      providesTags: ["Subscription"],
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
  useRetrieveListenTrackQuery,
  useListPlaylistQuery,
  useRetrievePlaylistQuery,
  useListRecentlyListenTracksQuery,
  useListRecentlyMyListenTracksQuery,
  useListGenresQuery,
  useRetrieveGenreQuery,
  useListSubscriptionQuery,
  useRetrieveSubscriptionQuery,
} = publicApiSlice