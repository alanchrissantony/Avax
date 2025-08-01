"use client";

import { Track } from "@/types/types";
import { Clock3, Music, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PlayTrackButton from "./PlayTrackButton";
import { useAppSelector } from "@/lib/hooks";
import { formatTime } from "@/utils/clientUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Loader from "@/components/general/Loader";
import {
  useListUserTracksLikedQuery,
} from "@/lib/features/tracks/trackApiSlice";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import useFavoriteFollow from "@/hooks/use-favorite-follow";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { toast } from "sonner"
import { usePlaylistAddTrackMutation, usePlaylistRemoveTrackMutation } from "@/lib/features/playlists/playlistApiSlice";
import TrackDialogDropdown from "@/components/tracks/TrackDialogDropdown";

interface Props {
  tracks: Track[] | undefined;
  tracksPlaylist?: Track[] | undefined;
  playlistSlug?: string | undefined;
  showHeader?: boolean;
  showCardHeader?: boolean;
  showArtistCardHeader?: boolean;
  showCover?: boolean;
  showAlbum?: boolean;
  showPlaysCount?: boolean;
  showSubtitle?: boolean;
  showIndex?: boolean;
  showAddToPlaylist?: boolean;
  showRemoveTrack?: boolean;
}

export default function TracksTable({
  tracks,
  tracksPlaylist,
  showSubtitle = false,
  showCover = false,
  showHeader = false,
  showCardHeader = false,
  showArtistCardHeader = false,
  showAlbum = false,
  showPlaysCount = false,
  showIndex = true,
  showAddToPlaylist = false,
  playlistSlug,
  showRemoveTrack = false,
}: Props) {
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const { activeTrack } = useAppSelector(state => state.track)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredTrackSlug, setHoveredTrackSlug] = useState<string | null>(null);

  const [addTrackToPlaylist, { isLoading: isLoadingAddTP }] = usePlaylistAddTrackMutation()
  const [removeTrackFromPlaylist, { isLoading: isLoadingRemoveTP }] = usePlaylistRemoveTrackMutation()

  const {
    data: tracksFav,
    isLoading: isLoadingTrFav,
    isFetching: isFetchingTrFav,
  } = useListUserTracksLikedQuery({}, { skip: !isAuthenticated || !tracks });

  const {
    handleAddFav,
    handleRemoveFav,
    isLoadingAddFav,
    isLoadingRemoveFav,
  } = useFavoriteFollow({ favoriteType: "track", trackSlug: hoveredTrackSlug })


  const load = isLoadingTrFav || isFetchingTrFav

  function handleAddToPlaylist(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    addTrackToPlaylist({ playlistSlug: playlistSlug, trackSlug: hoveredTrackSlug })
      .unwrap()
      .then((data) => {
        toast.success(data?.msg || "Track add to playlist successfully")
      })
      .catch((error) => {
        toast.error(error?.data?.msg || "Failed to added track to playlist.")
      })
  }

  function handleRemoveFromPlaylist(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    removeTrackFromPlaylist({ playlistSlug: playlistSlug, trackSlug: hoveredTrackSlug })
      .unwrap()
      .then((data) => {
        toast.success("Track removed from playlist successfully", {
          description: data?.msg || "You can undo this action from your playlist.",
        });
      })
      .catch((error) => {
        toast.error("Failed to remove track from playlist.", {
          description: error?.data?.msg || "Please try again or contact support.",
        });

      })
  }


  if (load) return <FullScreenSpinner />


  return (
    <div className="mt-4">
      {/* Table Header */}

      {showCardHeader && (
        <header className="bg-white/10 hover:bg-white/20 w-full h-20 mb-0.5 shadow-lg rounded-t-lg overflow-hidden">
          <Link href={`/albums/${tracks?.[0]?.album?.slug}`} className="">
            <div className="flex justify-start items-center space-x-4">
              {tracks?.[0]?.album ? (
                <Image
                  src={tracks[0].album?.image}
                  alt={tracks[0].album?.title}
                  height={80}
                  width={80}
                  className="aspect-square object-cover h-20 w-20"
                  priority
                />
              ) : (
                <div>
                  <Music size={80} />
                </div>
              )}
              <div>
                <h5 className="text-xs font-normal text-white">From the album</h5>
                <h2 className="text-white text-lg font-semibold hover:underline">
                  {tracks?.[0]?.album?.title}
                </h2>
              </div>
            </div>
          </Link>
        </header>
      )}

      {showArtistCardHeader && (
        <header className="bg-white/10 hover:bg-white/20 w-full h-20 mb-0.5 shadow-lg rounded-t-lg overflow-hidden">
          <Link href={`/artists/${tracks?.[0]?.artist?.slug}`}>
            <div className="flex justify-start items-center space-x-4">
              {tracks?.[0]?.artist ? (
                <Image
                  src={tracks[0].artist?.image}
                  alt={tracks[0].artist?.display_name}
                  height={80}
                  width={80}
                  className="aspect-square object-cover h-20 w-20"
                  priority
                />
              ) : (
                <div>
                  <Music size={80} />
                </div>
              )}
              <div>
                <h5 className="text-xs font-normal text-white">From the all albums</h5>
                <h2 className="text-white text-lg font-semibold hover:underline">
                  {tracks?.[0]?.artist?.display_name}
                </h2>
              </div>
            </div>
          </Link>
        </header>
      )}

      {showHeader && (
        <>
          <header className="grid grid-cols-12 p-4 pb-1 mb-2 text-white/60">
            {showIndex && (
              <div className="text-left ml-1 uppercase">
                #
              </div>
            )}
            <div
              className={`${(showAlbum || showPlaysCount) ? (showIndex ? "col-span-4" : "col-span-5") : (showIndex ? "col-span-8" : "col-span-9")} text-sm text-left`}
            >
              Title
            </div>

            {showAlbum && (
              <div className="col-span-4 text-sm text-left">
                Album
              </div>
            )}

            {showPlaysCount && (
              <div className="col-span-4 text-sm text-left">
                PlaysCount
              </div>
            )}

            <div className="col-span-3 ml-2 flex justify-center">
              <Clock3 size={16} />
            </div>
          </header>

          {/* Divider */}
          <div className="col-span-12 border-b border-[#404040]/80"></div>
        </>
      )}

      {/* Table Rows */}

      <div className="w-full col-span-12">
        {tracks?.map((track, index) => (
          <div
            className={`grid py-2 px-4 rounded-md grid-cols-12 group/item ${hoveredRow === index ? "bg-white/10 duration-300 transition" : "bg-transparent"
              }`}
            key={track.id}
            onMouseEnter={() => {
              setHoveredTrackSlug(track.slug)
              setHoveredRow(index)
            }}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {showIndex && (
              <span className="flex items-center col-span-1 text-sm text-white/60">
                {hoveredRow === index || activeTrack?.slug === track.slug ? (
                  <PlayTrackButton track={track} tracks={tracks} index={index} lines={true} className="text-xl w-1/2" />
                ) : (
                  <span className="ml-1">{index + 1}</span>
                )}
              </span>
            )}

            <div
              className={`${showAlbum || showPlaysCount ? (showIndex ? "col-span-4" : "col-span-5") : (showIndex ? "col-span-8" : "col-span-9")} flex items-center w-full`}
            >
              <div className="flex items-center w-full gap-3">
                {showCover && (
                  <div className="relative flex-shrink-0 w-10 h-10">
                    {track.image && track.image.length > 0 ? (
                      <Image
                        src={track.image}
                        alt={track.title}
                        height={40}
                        width={40}
                        className="object-contain w-10 h-10 rounded"
                      />
                    ) : (
                      <Music
                        size={16}
                        className="w-10 h-10 p-2 rounded bg-paper-secondary"
                      />
                    )}
                    {!showIndex && hoveredRow === index && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                        <PlayTrackButton track={track} tracks={tracks} index={index} lines={true} className="text-xl" />
                      </div>
                    )}
                  </div>
                )}

                <div className="w-full pr-3 truncate flex items-center justify-between">
                  <div>
                    <Link
                      href={`/tracks/${track.slug}`}
                      className={`w-10/12 text-sm font-medium truncate cursor-pointer hover:underline ${activeTrack?.slug === track.slug && "text-primary"}`}
                    >
                      {track.title}
                    </Link>

                    {showSubtitle && (
                      <div
                        className="flex flex-wrap items-center w-full gap-1 pr-3 text-sm text-white/60 group-hover/item:text-white">
                        <span className="truncate">
                          <Link
                            key={track.artist.id + track.id}
                            href={`/artists/${track.artist.slug}`}
                            className="hover:text-white hover:underline"
                          >
                            {track.artist.display_name}
                          </Link>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {showAlbum && (
              <div className="flex items-center justify-between w-full col-span-4 text-sm text-white/60">
                <Link
                  href={`/albums/${track.album.slug}`}
                  className="truncate hover:text-white hover:underline"
                >
                  {track.album.title}
                </Link>
              </div>
            )}

            {showPlaysCount && (
              <div className="flex items-center w-10/12 col-span-4 text-sm text-white/60">
                <h1 className="group-hover/item:text-white">
                  {track.plays_count.toLocaleString()}
                </h1>
              </div>
            )}

            <small className="flex items-center justify-center col-span-3 text-sm font-medium text-white/60 ">
              <div className="flex items-center w-full gap-3">
                {!showAddToPlaylist && (
                  <TooltipProvider>
                    <Tooltip>
                      {tracksFav?.results?.some((trackFav) => trackFav.slug === track?.slug) ? (
                        <>
                          <TooltipTrigger
                            onClick={handleRemoveFav}
                            disabled={isLoadingRemoveFav && (hoveredRow === index)}
                          >
                            {(isLoadingRemoveFav && (hoveredRow === index)) ?
                              <Loader className="w-[15px] h-[15px]" /> : (
                                <Star
                                  size={18}
                                  className="transition ease-in-out transform text-primary fill-primary hover:scale-105 duration-150"
                                />
                              )}
                          </TooltipTrigger>
                          <TooltipContent className="text-white bg-[#202020]">
                            <p>Remove from Liked Songs</p>
                          </TooltipContent>
                        </>
                      ) : (
                        <>
                          <TooltipTrigger onClick={handleAddFav} disabled={isLoadingAddFav && (hoveredRow === index)}>
                            {(isLoadingAddFav && (hoveredRow === index)) ? <Loader className="w-[15px] h-[15px]" /> : (
                              <Star
                                size={18}
                                className="opacity-0 group-hover/item:opacity-100 transition ease-in-out transform text-white/60 hover:scale-105 duration-150 hover:text-gray-100"
                              />
                            )}
                          </TooltipTrigger>
                          <TooltipContent className="text-white bg-[#202020]">
                            <p>Add to Liked Songs</p>
                          </TooltipContent>
                        </>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              {showAddToPlaylist ? (
                <div className="mr-2">
                  {tracksPlaylist?.some((trackPlaylist) => trackPlaylist.slug === track?.slug) ? (
                    <Button
                      size='sm'
                      variant='outline'
                      className="bg-opacity-0 text-sm w-16 h-7 text-white border-white hover:scale-105 transition duration-150 font-semibold"
                      onClick={handleRemoveFromPlaylist}
                    >
                      {(isLoadingRemoveTP && (hoveredRow === index)) ? <Loader /> : (
                        "Remove"
                      )}
                    </Button>
                  ) : (
                    <Button
                      size='sm'
                      variant='outline'
                      className="bg-opacity-0 text-sm w-14 h-7 text-white border-white hover:scale-105 transition duration-150 font-semibold"
                      onClick={handleAddToPlaylist}
                    >
                      {(isLoadingAddTP && (hoveredRow === index)) ? <Loader /> : (
                        "Add"
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                <span className="mx-auto w-full">{formatTime(track.duration)}</span>
              )}
              <div>
                <TrackDialogDropdown showRemoveTrack={showRemoveTrack} track={track} playlistSlug={playlistSlug} />
              </div>
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
