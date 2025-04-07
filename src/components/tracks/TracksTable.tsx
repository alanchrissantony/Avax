"use client";

import {Track} from "@/types/types";
import {fmtMSS} from "@/utils/clientUtils";
import {Clock3, Music} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import PlayTrackButton from "./PlayTrackButton";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface Props {
  tracks: Track[] | undefined;
  showHeader?: boolean;
  showCover?: boolean;
  showAlbum?: boolean;
  showPlaysCount?: boolean;
  showSubtitle?: boolean;
}

function formatTime(time: string) {
  // Split the time string into its components
  const parts = time.split(':');
  let hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = Math.floor(parseFloat(parts[2])); // Remove milliseconds

  // Format the time string to "H:MM"
  if (hours === 0) {
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  } else {
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
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
              <PlayTrackButton track={track} className="text-xl"/>
            ) : (
              <span className="flex items-center col-span-1 text-sm text-white/60">
                {index + 1}
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
                    className="w-10/12 text-sm font-medium truncate cursor-pointer hover:underline"
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
                  href={`/albums/${track.album.id}`}
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

    // <div className="mt-8">
    //   <Table>
    //     <TableCaption>A list of your recent invoices.</TableCaption>
    //     <TableHeader>
    //       <TableRow>
    //         <TableHead className="w-[10px]">#</TableHead>
    //         <TableHead>Title</TableHead>
    //         <TableHead>Album</TableHead>
    //         <TableHead className="flex justify-center pt-3"><Clock3 size={20}/></TableHead>
    //       </TableRow>
    //     </TableHeader>
    //     <TableBody>
    //       {tracks?.map((track, index) => (
    //         <TableRow>
    //           <TableCell className="text-white/60">1</TableCell>
    //           <TableCell>Paid</TableCell>
    //           <TableCell>Credit Card</TableCell>
    //           <TableCell className="text-right">$250.00</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </div>

  );
}
