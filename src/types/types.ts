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

export interface Artist extends BaseApi {
  slug: string;
  user: {
    id: number;
    displayName: string;
    type_profile: string;
    artist_slug: string;
    image: string;
    followers_count: number;
    is_premium: boolean;
  };
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

export interface Album extends BaseApi {
  slug: string;
  title: string;
  artist: {
    id: number;
    slug: string;
    display_name: string;
    image: string;
    color: string;
    is_verify: boolean;
  };
  image: string;
  color: string;
  track_slug: string;
  is_private: boolean;
  release_date: string;
}

export interface DetailAlbum extends Album {
  tracks: Track[];
  description: string;
  duration: string;
}

export interface Albums extends ListBaseApi {
  results: Album[];
}

export interface Track extends BaseApi {
  slug: string;
  title: string;
  duration: string;
  file: string;
  image: string;
  plays_count: number;
  color: string;
  artist: {
    id: number;
    slug: string;
    display_name: string;
    image: string;
    color: string;
    is_verify: boolean;
  };
  genre: {
    id: number;
    slug: string;
    name: string;
    image: string;
    color: string;
  };
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
  license: {
    id: number;
    name: string;
    text: string;
    artist: {
      id: number;
      slug: string;
      display_name: string;
      image: string;
      color: string;
      is_verify: boolean;
    };
    download_count: number;
    likes_count: number;
    user_of_likes: number[];
  }
}

export interface Tracks extends ListBaseApi {
  results: Track[];
}

export interface Playlist extends BaseApi {
  slug: string;
  title: string;
  image: string;
  color: string;
  track_slug: string;
  user: {
    id: number;
    display_name: string;
    type_profile: string;
    artist_slug: string;
    image: string;
    followers_count: number;
    is_premium: boolean;
  };
  genre: {
    id: number;
    slug: string;
    name: string;
    image: string;
    color: string;
  };
  is_private: boolean;
}

export interface DetailPlaylist extends Playlist {
  tracks: Track[];
  description: string;
  release_date: string;
  favorite_count: number
  duration: string;
}

export interface Playlists extends ListBaseApi {
  results: Playlist[];
}