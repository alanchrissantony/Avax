import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Ellipsis, ListStart, Radio, Trash} from "lucide-react";
import {Track} from "@/types/types";
import {toast} from "react-toastify";
import React from "react";
import {usePlaylistRemoveTrackMutation} from "@/lib/features/playlists/playlistApiSlice";
import Loader from "@/components/general/Loader";


interface Props {
  showRemoveTrack?: boolean;
  track: Track | undefined;
  playlistSlug?: string;
}


export default function TrackDialogDropdown({track, showRemoveTrack = false, playlistSlug}: Props) {
  const [removeTrackFromPlaylist, {isLoading: isLoadingRTP}] = usePlaylistRemoveTrackMutation()


  function handleRemoveTrackFromPlaylist(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();

    removeTrackFromPlaylist({playlistSlug: playlistSlug, trackSlug: track?.slug})
      .unwrap()
      .then((data) => {
        toast.success(data?.msg || "Track remove from playlist successfully")
      })
      .catch((error) => {
        toast.error(error?.data?.msg || "Failed to removed track from playlist.")
      })
  }

  if (isLoadingRTP) return <Loader/>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'
                className="flex opacity-0 group-hover/item:opacity-100 ease-in-out transform text-sm text-white border-white hover:scale-105 transition h-6 w-6 rounded-full hover:bg-white/0 duration-150">
          <Ellipsis className="h-7 w-7 text-[#afafaf]"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-4 mt-2 bg-[#272727] rounded-sm border-none shadow-2xl">
        <DropdownMenuGroup>
          {showRemoveTrack && (
            <DropdownMenuItem onClick={handleRemoveTrackFromPlaylist}>
              <button className="flex items-center w-full h-full text-start text-white/90">
                <Trash className="h-3.5 w-3.5 mr-2"/>
                Remove from this playlist
              </button>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-white/90">
            <ListStart className="h-3.5 w-3.5 mr-2"/>
            <span>Add to query</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white/90">
            <Radio className="h-3.5 w-3.5 mr-2"/>
            <span>Go to song radio</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}