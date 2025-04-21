import {useUserFollowMutation, useUserUnfollowMutation} from "@/lib/features/auth/authApiSlice";
import {useArtistAddFavoriteMutation, useArtistRemoveFavoriteMutation} from "@/lib/features/artists/artistApiSlice";
import {useAlbumAddFavoriteMutation, useAlbumRemoveFavoriteMutation} from "@/lib/features/albums/albumApiSlice";
import {
  usePlaylistAddFavoriteMutation,
  usePlaylistRemoveFavoriteMutation
} from "@/lib/features/playlists/playlistApiSlice";
import {toast} from "react-toastify";
import {useTrackAddFavoriteMutation, useTrackRemoveFavoriteMutation} from "@/lib/features/tracks/trackApiSlice";
import {loginUrl} from "@/utils/consts";
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";


interface Props {
  favoriteType?: "track" | "album" | "playlist" | "artist";
  userIdFollow?: number;
  slugFav?: string;
  trackSlug?: string | null;
}

export default function useFavoriteFollow({favoriteType, userIdFollow, slugFav, trackSlug}: Props) {
  const {isAuthenticated} = useAppSelector(state => state.auth)
  const [userFollow, {isLoading: isLoadingFollow}] = useUserFollowMutation()
  const [userUnfollow, {isLoading: isLoadingUnfollow}] = useUserUnfollowMutation()
  const [artistAddFav, {isLoading: isArtistAddFavorite}] = useArtistAddFavoriteMutation()
  const [artistRemoveFav, {isLoading: isArtistRemoveFavorite}] = useArtistRemoveFavoriteMutation()
  const [albumAddFav, {isLoading: isAlbumAddFavorite}] = useAlbumAddFavoriteMutation()
  const [albumRemoveFav, {isLoading: isAlbumRemoveFavorite}] = useAlbumRemoveFavoriteMutation()
  const [playlistAddFav, {isLoading: isPlaylistAddFavorite}] = usePlaylistAddFavoriteMutation()
  const [playlistRemoveFav, {isLoading: isPlaylistRemoveFavorite}] = usePlaylistRemoveFavoriteMutation()
  const [trackAddFav, {isLoading: isTrackAddFavorite}] = useTrackAddFavoriteMutation()
  const [trackRemoveFav, {isLoading: isTrackRemoveFavorite}] = useTrackRemoveFavoriteMutation()

  const isLoadingAddFav = (isArtistAddFavorite || isAlbumAddFavorite || isPlaylistAddFavorite || isTrackAddFavorite)
  const isLoadingRemoveFav = (isArtistRemoveFavorite || isAlbumRemoveFavorite || isPlaylistRemoveFavorite || isTrackRemoveFavorite)

  const router = useRouter()


  function handleAddFav(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!isAuthenticated) return router.replace(loginUrl)

    if (favoriteType === "artist") {
      artistAddFav({artistSlug: slugFav})
        .unwrap()
        .then((data) => {
          toast.success(data?.msg || "Artist add to favorite successfully")
        })
        .catch(() => {
          toast.error("Failed to added artist to favorite.")
        })
    }

    if (favoriteType === "album") {
      albumAddFav({albumSlug: slugFav})
        .unwrap()
        .then((data) => {
          toast.success(data?.msg || "Album add to favorite successfully")
        })
        .catch(() => {
          toast.error("Failed to added album to favorite.")
        })
    }

    if (favoriteType === "playlist") {
      playlistAddFav({playlistSlug: slugFav})
        .unwrap()
        .then((data) => {
          toast.success(data?.msg || "Playlist add to favorite successfully")
        })
        .catch(() => {
          toast.error("Failed to added playlist to favorite.")
        })
    }

    if (favoriteType === "track") {
      trackAddFav({trackSlug: slugFav || trackSlug})
        .unwrap()
        .then((data) => {
          toast.success(data?.msg || "Track liked successfully")
        })
        .catch(() => {
          toast.error("Failed to like Track.")
        })
    }
  }

  function handleRemoveFav(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!isAuthenticated) return router.replace(loginUrl)

    if (favoriteType === "artist") {
      artistRemoveFav({artistSlug: slugFav})
        .unwrap()
        .then((data) => {
          toast.success(data?.msg || "Artist remove from favorite successfully")
        })
        .catch(() => {
          toast.error("Failed to removing artist from favorite.")
        })
    }

    if (favoriteType === "album") {
      albumRemoveFav({albumSlug: slugFav})
        .unwrap()
        .then((data) => {
          toast.success(data?.msg || "Album remove from favorite successfully")
        })
        .catch(() => {
          toast.error("Failed to removing album from favorite.")
        })
    }

    if (favoriteType === "playlist") {
      playlistRemoveFav({playlistSlug: slugFav})
        .unwrap()
        .then((data) => {
          toast.success(data?.msg || "Playlist remove from favorite successfully")
        })
        .catch(() => {
          toast.error("Failed to removing playlist from favorite.")
        })
    }

    if (favoriteType === "track") {
      trackRemoveFav({trackSlug: slugFav || trackSlug})
        .unwrap()
        .then((data) => {
          toast.success(data?.msg || "Track remove from favorite successfully")
        })
        .catch(() => {
          toast.error("Failed to removing track from favorite.")
        })
    }
  }

  function handleFollow(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    userFollow({userId: userIdFollow})
      .unwrap()
      .then((data) => {
        toast.success(data?.msg || "Follow successfully")
      })
      .catch(() => {
        toast.error("Failed to follow.")
      })
  }

  function handleUnfollow(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    userUnfollow({userId: userIdFollow})
      .unwrap()
      .then((data) => {
        toast.success(data?.msg || "Unfollow successfully")
      })
      .catch(() => {
        toast.error("Failed to Unfollow.")
      })
  }


  return {
    handleFollow,
    handleUnfollow,
    handleAddFav,
    handleRemoveFav,
    isLoadingFollow,
    isLoadingUnfollow,
    isLoadingAddFav,
    isLoadingRemoveFav,
  }
}