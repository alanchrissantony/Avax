"use client";

import {CirclePlus, Dot, Music} from "lucide-react";
import Image from "next/image";
import {
  useListAlbumQuery,
  useListTrackQuery, useRetrieveAlbumQuery,
  useRetrievePlaylistQuery
} from "@/lib/features/other/publicApiSlice";
import TracksTable from "@/components/tracks/TracksTable";
import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import {useAppSelector} from "@/lib/hooks";
import Header from "@/components/general/Header";
import PreviewPlayer from "@/components/tracks/PreviewPlayer";
import FooterLogin from "@/components/general/FooterLogin";
import Footer from "@/components/general/Footer";
import Link from "next/link";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {formatDuration} from "@/utils/clientUtils";
import AlbumsLayout from "@/app/albums/layout";
import AlbumCards from "@/components/albums/AlbumCards";
import {format} from "date-fns";

interface Props {
  params: {
    slug: string;
  };
}

export default function AlbumsPage({params}: Props) {
  const {data: album, isLoading, isFetching} = useRetrieveAlbumQuery(params.slug)
  const {
    data: artistAlbums,
    isLoading: isLoadingA,
    isFetching: isFetchingA,
  } = useListAlbumQuery({artistSlug: album?.artist?.slug || "null"})

  const load = isLoading || isFetching || isLoadingA || isFetchingA

  const {activeTrack, currentIndex} = useAppSelector(state => state.track)

  const AlbumBgColor = album?.color || "#202020";

  console.log(album?.release_date)

  return (
    <>
      <div
        className="h-full rounded-lg"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${AlbumBgColor}, #131313, #131313)`,
        }}
      >
        <Header/>
        <div className="h-60 bg-opacity-30 bg-black">
          <div className="flex items-end gap-6 p-4 pt-10">
            {album && (
              <>
                {album.image.length > 0 ? (
                  <Image
                    src={album.image}
                    alt={album.title}
                    height={170}
                    width={170}
                    className="aspect-square object-cover shadow-2xl rounded-sm"
                    priority
                  />
                ) : (
                  <div className="">
                    <Music size={160} className=" bg-paper "/>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <h5 className="text-xs font-bold uppercase">Album</h5>
                  <h2 className="text-6xl font-bold">{album.title}</h2>

                  {album.description && (
                    <p className="font-medium text-sm mt-3 whitespace-pre-line text-white/50">
                      {album.description}
                    </p>
                  )}

                  <div className="flex items-center text-sm font-medium">
                    <Image
                      src={album.artist.image}
                      alt={album.artist.display_name}
                      height={24}
                      width={24}
                      className="aspect-square object-cover rounded-full mr-1"
                      priority
                    />
                    <Link href={`/artists/${album.artist.slug}`}
                          className="font-semibold hover:underline">{album.artist.display_name}</Link>
                    {album.release_date && (
                      <>
                        <Dot/>
                        <span>
                          {format(new Date(album.release_date), 'yyyy')}
                        </span>
                      </>
                    )}
                    {album.tracks.length > 0 && (
                      <>
                        <Dot/>
                        <span>{album.tracks.length.toLocaleString()} {album.tracks.length === 1 ? "song" : "songs"}</span>
                      </>
                    )}
                    {album?.duration && (
                      <>
                        <Dot/>
                        <span className="text-white/50">{formatDuration(album.duration)}</span>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mx-6 my-6">
          <div className="flex items-center space-x-6">
            <PlayTrackButton
              track={album?.tracks?.[currentIndex] || (activeTrack || undefined)}
              tracks={album?.tracks}
              index={currentIndex}
              variant="filled"
              className="w-14 h-14 text-4xl"
            />
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
          </div>

          <div>
            <TracksTable
              tracks={album?.tracks}
              showHeader
              showSubtitle
            />
          </div>

          {album?.release_date && (
            <div>
              <p className="font-normal text-sm mt-10 text-white/60">
                {format(new Date(album.release_date), 'MMMM dd, yyyy')}
              </p>
              <div className="font-normal text-xs text-white/50">
                <p>© {format(new Date(album.release_date), 'yyyy')} {album?.artist?.display_name}</p>
                <p>℗ {format(new Date(album.release_date), 'yyyy')} {album?.artist?.display_name}</p>
              </div>
            </div>
          )}

          {(artistAlbums?.count || 0) > 0 &&
            <div className="my-8 mt-16">
              <div className="flex items-center justify-between w-full mb-2">
                <Link href={`/albums`} className="mt-3 hover:underline font-bold text-2xl">
                  More by {album?.artist.display_name}
                </Link>
                <Link href={`/albums`} className="text-sm mt-4 font-bold text-white/50 hover:underline">
                  See discography
                </Link>
              </div>
              <AlbumCards albums={artistAlbums?.results.slice(0, 5)}/>
            </div>
          }

          <Footer/>
        </div>
      </div>
      {activeTrack ? <PreviewPlayer/> : <FooterLogin/>}
    </>
  );
}
