import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {CircleCheck, CirclePlus} from "lucide-react";
import {Track} from "@/types/types";
import {Button} from "@/components/ui/button";
import {useUserFollowMutation, useUserUnfollowMutation} from "@/lib/features/auth/authApiSlice";
import {toast} from "react-toastify";
import Loader from "@/components/general/Loader";
import {useArtistAddFavoriteMutation, useArtistRemoveFavoriteMutation} from "@/lib/features/artists/artistApiSlice";
import {useAlbumAddFavoriteMutation, useAlbumRemoveFavoriteMutation} from "@/lib/features/albums/albumApiSlice";
import {
  usePlaylistAddFavoriteMutation,
  usePlaylistRemoveFavoriteMutation
} from "@/lib/features/playlists/playlistApiSlice";

interface Props {
  track?: Track | undefined;
  tracks?: Track[] | undefined;
  index?: number | null;
  isPlayButton?: boolean;
  isShowFavorite?: boolean;
  favoriteType?: "track" | "album" | "playlist" | "artist";
  isShowFollow?: boolean;
  isFollowing?: boolean;
  isFavorite?: boolean;
  userIdFollow?: number;
  slugFav?: string;
}


export default function PlayButtonAndOther({
                                             track,
                                             tracks,
                                             index,
                                             isPlayButton = true,
                                             isShowFollow = false,
                                             isFollowing = false,
                                             isShowFavorite = false,
                                             favoriteType,
                                             isFavorite = false,
                                             userIdFollow,
                                             slugFav,
                                           }: Props) {
  const [userFollow, {isLoading: isLoadingFollow}] = useUserFollowMutation()
  const [userUnfollow, {isLoading: isLoadingUnfollow}] = useUserUnfollowMutation()
  const [artistAddFav, {isLoading: isArtistAddFavorite}] = useArtistAddFavoriteMutation()
  const [artistRemoveFav, {isLoading: isArtistRemoveFavorite}] = useArtistRemoveFavoriteMutation()
  const [albumAddFav, {isLoading: isAlbumAddFavorite}] = useAlbumAddFavoriteMutation()
  const [albumRemoveFav, {isLoading: isAlbumRemoveFavorite}] = useAlbumRemoveFavoriteMutation()
  const [playlistAddFav, {isLoading: isPlaylistAddFavorite}] = usePlaylistAddFavoriteMutation()
  const [playlistRemoveFav, {isLoading: isPlaylistRemoveFavorite}] = usePlaylistRemoveFavoriteMutation()

  const isLoadingAddFav = (isArtistAddFavorite || isAlbumAddFavorite || isPlaylistAddFavorite)
  const isLoadingRemoveFav = (isArtistRemoveFavorite || isAlbumRemoveFavorite || isPlaylistRemoveFavorite)


  function handleAddFav(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

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
  }

  function handleRemoveFav(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

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

  return (
    <div className="flex items-center space-x-6 ml-4">
      {isPlayButton && (
        <PlayTrackButton
          track={track}
          tracks={tracks}
          index={index}
          variant="filled"
          className="w-14 h-14 text-4xl"
        />
      )}
      {isShowFavorite && (
        <TooltipProvider>
          <Tooltip>
            {isFavorite ? (
              <>
                <TooltipTrigger onClick={handleRemoveFav} disabled={isLoadingRemoveFav}>
                  {isLoadingRemoveFav ? <Loader className="w-[32px] h-[32px]"/> : (
                    <CircleCheck strokeWidth={3} size={33}
                                 className="text-green-500 hover:scale-105 duration-150 hover:text-green-300"/>
                  )}
                </TooltipTrigger>
                <TooltipContent className="text-white bg-[#202020]">
                  <p>Remove from Your library</p>
                </TooltipContent>
              </>
            ) : (
              <>
                <TooltipTrigger onClick={handleAddFav} disabled={isLoadingAddFav}>
                  {isLoadingAddFav ? <Loader className="w-[32px] h-[32px]"/> : (
                    <CirclePlus size={33}
                                className="text-[#909090] hover:scale-105 duration-150 hover:text-gray-100"/>
                  )}
                </TooltipTrigger>
                <TooltipContent className="text-white bg-[#202020]">
                  <p>Save to Your library</p>
                </TooltipContent>
              </>
            )}
          </Tooltip>
        </TooltipProvider>
      )}

      {isShowFollow && (
        isFollowing ? (
          <Button
            disabled={isLoadingUnfollow}
            onClick={handleUnfollow}
            variant="ghost"
            className="rounded-full border border-white/30 h-8 w-19 hover:bg-inherit hover:border-white font-semibold hover:scale-105 duration-150"
          >
            {isLoadingUnfollow ? <Loader/> : "Following"}
          </Button>
        ) : (
          <Button
            disabled={isLoadingFollow}
            onClick={handleFollow}
            variant="ghost"
            className="rounded-full border border-white/30 h-8 w-19 hover:bg-inherit hover:border-white font-semibold hover:scale-105 duration-150"
          >
            {isLoadingFollow ? <Loader/> : "Follow"}
          </Button>
        )
      )}

    </div>
  )
}