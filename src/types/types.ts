import {ChangeEvent, FormEvent} from 'react'

export type InputChange = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export interface LoginForm extends FormSubmit {
  email: string
  password: string
}

export interface BaseApi {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface ListBaseApi {
  count: number;
  next: string;
  previous: string;
}

export interface User extends BaseApi {
  display_name: string;
  type_profile: string,
  artist_slug: string;
  email: string;
  gender: string;
  country: string;
  image: string;
  color: string;
  is_premium: boolean;
  followers_count: number;
  following_count: number;
  playlists_count: number;
}

export interface UserProfile extends BaseApi {
  display_name: string;
  type_profile: string,
  email: string;
  gender: string;
  country: string;
  image: string;
  is_premium: boolean;
}

export interface ShortUser extends BaseApi {
  display_name: string;
  type_profile: string;
  artist_slug: string;
  image: string;
  followers_count: number;
  is_premium: boolean;
}

export interface ShortUsers extends ListBaseApi {
  results: ShortUser[];
}

export interface ShortArtist extends BaseApi {
  slug: string;
  display_name: string;
  image: string;
  color: string;
  is_verify: boolean;
}

export interface Artist extends BaseApi {
  slug: string;
  user: ShortUser;
  first_name: string;
  last_name: string;
  display_name: string;
  image: string;
  color: string;
  track_slug: string;
  artist_listeners: number;
  is_verify: boolean;
}

export interface Artists extends ListBaseApi {
  results: Artist[];
}

export interface UpdateArtist {
  first_name: string;
  last_name: string;
  display_name: string;
  image?: string;
}

export interface License extends BaseApi {
  artist: ShortArtist;
  name: string;
  text: string;
}

export interface UpdateLicense {
  name: string;
  text: string;
}

export interface Album extends BaseApi {
  slug: string;
  title: string;
  artist: ShortArtist;
  image: string;
  color: string;
  track_slug: string;
  is_private: boolean;
  release_date: string;
}

export interface DetailAlbum extends Album {
  tracks: Track[];
  description: string;
  album_listeners: number;
  duration: string;
}

export interface UpdateAlbum {
  title: string;
  image: string;
  description: string;
  is_private: boolean;
  release_date: string;
}

export interface Albums extends ListBaseApi {
  results: Album[];
}

export interface ListDetailAlbums extends ListBaseApi {
  results: DetailAlbum[];
}

export interface Track extends BaseApi {
  slug: string;
  title: string;
  duration: string;
  file: string;
  image: string;
  plays_count: number;
  color: string;
  artist: ShortArtist;
  genre: Genre;
  album: {
    id: number;
    slug: string;
    title: string;
    image: string;
    color: string;
    is_private: boolean;
  };
}

export interface DetailTrack extends Track {
  release_date: string;
  download_count: number;
  likes_count: number;
  user_of_likes: number[];
  license: {
    id: number;
    name: string;
    text: string;
    artist: ShortArtist;
  };
  is_private: boolean;
}

export interface UpdateTrack {
  title: string;
  image: string;
  license: number;
  genre: number;
  album: number;
  file: string;
  is_private: boolean;
  release_date: string;
}

export interface Tracks extends ListBaseApi {
  results: Track[];
}

export interface ListDetailTracks extends ListBaseApi {
  results: DetailTrack[];
}

export interface Playlist extends BaseApi {
  slug: string;
  title: string;
  image: string;
  color: string;
  track_slug: string;
  user: ShortUser;
  genre: Genre;
  is_private: boolean;
}

export interface DetailPlaylist extends Playlist {
  tracks: Track[];
  description: string;
  release_date: string;
  favorite_count: number
  duration: string;
}

export interface UpdatePlaylist {
  title: string;
  image: string;
  description: string;
  release_date: string;
  genre: number;
  is_private: boolean;
}

export interface ListDetailPlaylist extends ListBaseApi {
  results: DetailPlaylist[];
}

export interface Playlists extends ListBaseApi {
  results: Playlist[];
}


export interface PlaylistsLiked extends ListBaseApi {
  results: {
    id: number;
    playlist: Playlist;
    created_at: string;
    updated_at: string;
  }[];
}

export interface AlbumsLiked extends ListBaseApi {
  results: {
    id: number;
    album: Album;
    created_at: string;
    updated_at: string;
  }[];
}

export interface ArtistsLiked extends ListBaseApi {
  results: {
    id: number;
    artist: ShortArtist;
    created_at: string;
    updated_at: string;
  }[];
}

export interface RecentlyListenTracks extends ListBaseApi {
  results: Track[];
}

export interface Genre extends BaseApi {
  slug: string;
  name: string;
  image: string;
  color: string;
}

export interface Genres extends ListBaseApi {
  results: Genre[];
}

export interface Subscription extends BaseApi {
  name: string;
  price: string;
  description: string;
  days_exp: number;
  feature: {
    id: number;
    name: string;
    permission: string;
  }[];
}