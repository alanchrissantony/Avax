import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Star } from "lucide-react";
import { Track } from "@/types/types";
import { Button } from "@/components/ui/button";
import Loader from "@/components/general/Loader";
import useFavoriteFollow from "@/hooks/use-favorite-follow";

interface Props {
  className?: string;
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
  variant?: "simple" | "filled" | "classic";
  bgColor?: string
}


export default function PlayButtonAndOther({
  className="w-14 h-14 text-4xl",
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
  variant = "filled",
  bgColor
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
  } = useFavoriteFollow({ favoriteType, userIdFollow, slugFav })

  return (
    <div className="flex items-center space-x-6 ml-4">
      {isPlayButton && (
        <PlayTrackButton
          track={track}
          tracks={tracks}
          index={index}
          variant={variant}
          className={className}
          bgColor={bgColor}
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
                      className={`${favoriteType === "trackPlayer" ? "w-[21px] h-[21px]" : "w-[32px] h-[32px]"}`} /> : (
                      <Star size={favoriteType === "trackPlayer" ? 20 : 33}
                        className="text-primary fill-primary hover:scale-105 duration-150" />
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
                    className={`${favoriteType === "trackPlayer" ? "w-[21px] h-[21px]" : "w-[32px] h-[32px]"}`} /> : (
                    <Star size={favoriteType === "trackPlayer" ? 20 : 33}
                      className="text-[#909090] hover:scale-105 duration-150 hover:text-gray-100" />
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
            {isLoadingUnfollow ? <Loader /> : "Following"}
          </Button>
        ) : (
          <Button
            disabled={isLoadingFollow}
            onClick={handleFollow}
            variant="ghost"
            className="rounded-full border border-white/30 h-8 w-19 hover:bg-inherit hover:border-white font-semibold hover:scale-105 duration-150"
          >
            {isLoadingFollow ? <Loader /> : "Follow"}
          </Button>
        )
      )}

    </div>
  )
}