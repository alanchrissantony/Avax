import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {CircleCheck, CirclePlus} from "lucide-react";
import {Track} from "@/types/types";
import {Button} from "@/components/ui/button";
import Loader from "@/components/general/Loader";
import useFavoriteFollow from "@/hooks/use-favorite-follow";

interface Props {
  track?: Track | undefined;
  tracks?: Track[] | undefined;
  index?: number | null;
  isPlayButton?: boolean;
  isShowFavorite?: boolean;
  favoriteType?: "track" | "trackPlayer" | "album" | "playlist" | "artist";
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
  const {
    handleFollow,
    handleUnfollow,
    handleAddFav,
    handleRemoveFav,
    isLoadingFollow,
    isLoadingUnfollow,
    isLoadingAddFav,
    isLoadingRemoveFav,
  } = useFavoriteFollow({favoriteType, userIdFollow, slugFav})

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
                  {isLoadingRemoveFav ?
                    <Loader
                      className={`${favoriteType === "trackPlayer" ? "w-[21px] h-[21px]" : "w-[32px] h-[32px]"}`}/> : (
                      <CircleCheck strokeWidth={3} size={favoriteType === "trackPlayer" ? 20 : 33}
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
                  {isLoadingAddFav ? <Loader
                    className={`${favoriteType === "trackPlayer" ? "w-[21px] h-[21px]" : "w-[32px] h-[32px]"}`}/> : (
                    <CirclePlus size={favoriteType === "trackPlayer" ? 20 : 33}
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