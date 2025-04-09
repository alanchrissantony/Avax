"use client";

import {Track} from "@/types/types";
import {Clock3, Music} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import PlayTrackButton from "./PlayTrackButton";
import {useAppSelector} from "@/lib/hooks";
import {formatTime} from "@/utils/clientUtils";

interface Props {
  tracks: Track[] | undefined;
  showHeader?: boolean;
  showCover?: boolean;
  showAlbum?: boolean;
  showPlaysCount?: boolean;
  showSubtitle?: boolean;
}

export default function TracksTable({
                                      tracks,
                                      showSubtitle = false,
                                      showCover = false,
                                      showHeader = false,
                                      showAlbum = false,
                                      showPlaysCount = false,
                                    }: Props) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const {activeTrack} = useAppSelector(state => state.track)

  return (
    <div className="mt-8">
      {/* Table Header */}

      {showHeader && (
        <>
          <header className="grid grid-cols-12 gap-2 p-4 pb-1 text-white/60">
            <div className="col-span-1 tracking-wider text-left uppercase">
              #
            </div>

            <div
              className={`${
                (showAlbum || showPlaysCount) ? "col-span-6" : "col-span-10"
              } text-sm text-left`}
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

            <div className="col-span-1 flex justify-center">
              <Clock3 size={16}/>
            </div>
          </header>

          {/* Divider */}
          <div className="col-span-12 border-b border-paper-600"></div>
        </>
      )}

      {/* Table Rows */}

      <div className="w-full col-span-12 mt-2">
        {tracks?.map((track, index) => (
          <div
            className={`grid py-2 px-4 rounded-md grid-cols-12 group/item ${
              hoveredRow === index ? "bg-white/10 duration-300 transition" : "bg-transparent"
            }`}
            key={track.id}
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {hoveredRow === index ? (
              <PlayTrackButton track={track} tracks={tracks} index={index} lines={true} className="text-xl w-1/2"/>
            ) : (
              <span
                className="flex items-center col-span-1 text-sm text-white/60">
                {activeTrack?.slug === track.slug ? (
                  <PlayTrackButton track={track} tracks={tracks} index={index} lines={true} className="text-xl w-1/2"/>
                ) : (
                  index + 1
                )}
              </span>
            )}

            <div
              className={`${
                showAlbum || showPlaysCount ? "col-span-6" : "col-span-10"
              } flex items-center w-full`}
            >
              <div className="flex items-center w-full gap-3">
                {showCover &&
                  (track.album.image && track.album.image.length > 0 ? (
                    <div className="flex-shrink-0 w-10 h-10">
                      <Image
                        src={track.album.image}
                        alt={track.title}
                        height={40}
                        width={40}
                        className="object-contain w-10 h-10 rounded"
                      />
                    </div>
                  ) : (
                    <Music
                      size={16}
                      className="w-10 h-10 p-2 rounded bg-paper-secondary"
                    />
                  ))}

                <div className="w-full pr-3 truncate">
                  <Link
                    href={`/tracks/${track.slug}`}
                    className={`w-10/12 text-sm font-medium truncate cursor-pointer hover:underline ${
                      activeTrack?.slug === track.slug && "text-green-500"}`}
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

            {showAlbum && (
              <div className="flex items-center w-10/12 col-span-4 text-sm text-white/60">
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
                  {track.plays_count}
                </h1>
              </div>
            )}

            <small className="flex items-center justify-center col-span-1 text-sm font-medium text-white/60 ">
              {formatTime(track.duration)}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
