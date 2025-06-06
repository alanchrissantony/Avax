import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Star } from "lucide-react";
import Loader from "@/components/general/Loader";
import { memo, useCallback, useMemo } from "react";

interface Props {
  className?: string;
  isFavorite?: boolean;
  favoriteType?: "track" | "trackPlayer" | "album" | "playlist" | "artist";
  bgColor?: string;
  handleAddFav: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveFav: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoadingAddFav: boolean;
  isLoadingRemoveFav: boolean;

}

const ICON_SIZES = {
  trackPlayer: 20,
  default: 33,
  button: 21,
};

const LikeButton = memo(function LikeButton({
  bgColor,
  className = "",
  isFavorite = false,
  favoriteType,
  handleAddFav,
  handleRemoveFav,
  isLoadingAddFav,
  isLoadingRemoveFav,
}: Props) {
  const isLoading = isLoadingAddFav || isLoadingRemoveFav;


  const size = bgColor
    ? ICON_SIZES.button
    : favoriteType === "trackPlayer"
    ? ICON_SIZES.trackPlayer
    : ICON_SIZES.default;

  const onClickHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      isFavorite ? handleRemoveFav(e) : handleAddFav(e);
    },
    [isFavorite, handleAddFav, handleRemoveFav]
  );


  const loader = useMemo(() => (
    <Loader className={`w-[${size}px] h-[${size}px]`} />
  ), [size]);


  const starIcon = useMemo(() => (
    <Star
      size={size}
      className={
        bgColor
          ? "text-white text-2xl"
          : isFavorite
          ? "text-primary fill-primary hover:scale-105 duration-150"
          : "text-[#909090] hover:scale-105 duration-150 hover:text-gray-100"
      }
      style={isFavorite && bgColor ? { fill: "#ffffff" } : undefined}
    />
  ), [size, isFavorite, bgColor]);

  if (bgColor) {
    return (
      <button
        className={`flex items-center justify-center rounded-lg ${className}`}
        style={{ backgroundColor: bgColor }}
        onClick={onClickHandler}
        disabled={isLoading}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isLoading ? loader : starIcon}
        <span className="text-white text-base font-bold ml-2">Favourite</span>
      </button>
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClickHandler}
            disabled={isLoading}
            className="focus:outline-none"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isLoading ? loader : starIcon}
          </button>
        </TooltipTrigger>
        <TooltipContent 
          className="text-white bg-[#202020] text-sm py-1 px-2"
          side="top"
          align="center"
        >
          {isFavorite ? "Remove from Your library" : "Save to Your library"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export default LikeButton;
