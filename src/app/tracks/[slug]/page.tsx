"use client";

import {CirclePlus, Dot, Music} from "lucide-react";
import Image from "next/image";
import {
  useListAlbumQuery, useListArtistQuery,
  useListTrackQuery, useRetrieveAlbumQuery, useRetrieveTrackQuery
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
import {formatTime} from "@/utils/clientUtils";
import AlbumCards from "@/components/albums/AlbumCards";
import {format} from "date-fns";
import ArtistCards from "@/components/artists/ArtistCards";

interface Props {
  params: {
    slug: string;
  };
}

export default function TracksPage({params}: Props) {
  const {data: track, isLoading, isFetching} = useRetrieveTrackQuery(params.slug)
  const {
    data: recommendations,
    isLoading: isLoadingRec,
    isFetching: isFetchingRec,
  } = useListTrackQuery({genreSlug: track?.genre?.slug || ''})
  const {
    data: artistTracks,
    isLoading: isLoadingArtistTracks,
    isFetching: isFetchingArtistTracks,
  } = useListTrackQuery({artistSlug: track?.artist?.slug || 'null'})
  const {
    data: artistAlbums,
    isLoading: isLoadingA,
    isFetching: isFetchingA,
  } = useListAlbumQuery({artistSlug: track?.artist?.slug || "null"})
  const {
    data: relatedArtists,
    isLoading: isLoadingArtists,
    isFetching: isFetchingArtists
  } = useListArtistQuery({})
  const {
    data: trackAlbum,
    isLoading: isLoadingAlbums,
    isFetching: isFetchingAlbums
  } = useRetrieveAlbumQuery(track?.album?.slug || 'null')

  const load = (
    isLoading || isFetching || isLoadingRec || isFetchingRec ||
    isLoadingArtistTracks || isFetchingArtistTracks || isLoadingA || isFetchingA ||
    isLoadingArtists || isFetchingArtists || isLoadingAlbums || isFetchingAlbums
  )

  const {activeTrack} = useAppSelector(state => state.track)

  const TrackAlbumBgColor = track?.album?.color || "#202020";

  return (
    <>
      <div
        className="h-full rounded-lg"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${TrackAlbumBgColor} 0%, #131313 30%, #131313 100%)`,
        }}
      >
        <Header/>
        <div className="h-72 bg-opacity-30 bg-black">
          <div className="flex items-end gap-6 p-4 pt-20">
            {track && (
              <>
                {track.album.image.length > 0 ? (
                  <Image
                    src={track.album.image}
                    alt={track.title}
                    height={170}
                    width={170}
                    className="aspect-square object-cover shadow-2xl rounded-sm h-44 w-44"
                    priority
                  />
                ) : (
                  <div>
                    <Music size={160}/>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <h5 className="text-xs font-bold">Song</h5>
                  <h2 className="text-6xl font-bold">{track.title}</h2>

                  <div className="flex items-center text-sm font-normal">
                    <Image
                      src={track.artist.image}
                      alt={track.artist.display_name}
                      height={24}
                      width={24}
                      className="aspect-square object-cover rounded-full mr-1 w-6 h-6"
                      priority
                    />
                    <Link href={`/artists/${track.artist.slug}`} className="font-semibold hover:underline">
                      {track.artist.display_name}
                    </Link>
                    {track.album.title && (
                      <>
                        <Dot/>
                        <Link href={`/albums/${track.album.slug}`} className="hover:underline">
                          {track.album.title}
                        </Link>
                      </>
                    )}

                    {track.release_date && (
                      <>
                        <Dot/>
                        <span>
                          {format(new Date(track.release_date), 'yyyy')}
                        </span>
                      </>
                    )}
                    {track.duration && (
                      <>
                        <Dot/>
                        <span>{formatTime(track.duration)}</span>
                      </>
                    )}
                    {(track.plays_count >= 0) && (
                      <>
                        <Dot/>
                        <span>{track.plays_count.toLocaleString()}</span>
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
              track={track}
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

          {(recommendations?.count || 0) > 0 &&
            <div className="my-8">
              <h1 className="font-bold text-2xl pb-1">Recommended</h1>
              <p className="text-sm text-white/60">Based on what`s in this playlist</p>
              <TracksTable
                tracks={recommendations?.results.slice(0, 5)}
                showCover
                showSubtitle
                showPlaysCount
              />
            </div>
          }

          {(artistTracks?.count || 0) > 0 && (
            <div className="my-8">
              <p className="text-sm text-white/60 pb-1">Popular Tracks by</p>
              <h1 className="font-bold text-2xl">{track?.artist?.display_name}</h1>
              <TracksTable
                tracks={artistTracks?.results.slice(0, 5)}
                showPlaysCount
                showCover
              />
            </div>
          )}

          {(artistAlbums?.count || 0) > 0 &&
            <div className="my-8 mt-16">
              <div className="flex items-center justify-between w-full mb-3">
                <Link href={`/artist/${track?.artist?.slug}/discography/album`}
                      className="mt-3 hover:underline font-bold text-2xl">
                  Popular Albums by {track?.artist?.display_name}
                </Link>
                <Link href={`/artist/${track?.artist?.slug}/discography/album`}
                      className="text-sm mt-4 font-bold text-white/50 hover:underline">
                  Show all
                </Link>
              </div>
              <AlbumCards albums={artistAlbums?.results.slice(0, 5)}/>
            </div>
          }

          {(relatedArtists?.count || 0) > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between w-full mb-2">
                <Link href={`/artists`}
                      className="mt-3 font-bold text-2xl hover:underline ml-2">Fans also like</Link>
                <Link href={`/artists`}
                      className="text-sm mt-4 text-white/50 font-bold hover:underline">Show all</Link>
              </div>
              <ArtistCards artists={relatedArtists?.results.slice(0, 5).reverse()}/>
            </div>
          )}

          {trackAlbum && (
            <TracksTable
              tracks={trackAlbum.tracks}
              showCardHeader
              showSubtitle
            />
          )}

          {track?.release_date && (
            <div>
              <p className="font-normal text-sm mt-10 text-white/60">
                {format(new Date(track.release_date), 'MMMM dd, yyyy')}
              </p>
              <div className="font-normal text-xs text-white/50">
                <p>© {format(new Date(track.release_date), 'yyyy')} {track?.artist?.display_name}</p>
                <p>℗ {format(new Date(track.release_date), 'yyyy')} {track?.artist?.display_name}</p>
              </div>
            </div>
          )}

          <Footer/>
        </div>
      </div>
      {activeTrack ? <PreviewPlayer/> : <FooterLogin/>}
    </>
  );
}
