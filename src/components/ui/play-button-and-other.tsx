import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {CirclePlus} from "lucide-react";
import {Track} from "@/types/types";
import {Button} from "@/components/ui/button";

interface Props {
  track?: Track | undefined;
  tracks?: Track[] | undefined;
  index?: number | null;
  isPlayButton?: boolean;
  isFavorite?: boolean;
  isFollow?: boolean;
}


export default function PlayButtonAndOther({
                                             track,
                                             tracks,
                                             index,
                                             isPlayButton = true,
                                             isFollow = false,
                                             isFavorite = false,
                                           }: Props) {
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
      {isFavorite && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CirclePlus size={33} className="text-[#909090] hover:scale-105 duration-150 hover:text-gray-100"/>
            </TooltipTrigger>
            <TooltipContent className="text-white bg-[#202020]">
              <p>Save to Your library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {isFollow && (
        <Button variant="ghost"
                className="rounded-full border border-white/30 h-8 w-19 hover:bg-inherit hover:border-white font-semibold hover:scale-105 duration-150">
          Follow
        </Button>
      )}

    </div>
  )
}