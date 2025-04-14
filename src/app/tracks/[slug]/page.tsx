"use client";

import {Dot, Music} from "lucide-react";
import Image from "next/image";
import {
  useListAlbumQuery, useListArtistQuery,
  useListTrackQuery, useRetrieveAlbumQuery, useRetrieveTrackQuery
} from "@/lib/features/other/publicApiSlice";
import TracksTable from "@/components/tracks/TracksTable";
import Footer from "@/components/general/Footer";
import Link from "next/link";
import {formatTime} from "@/utils/clientUtils";
import AlbumCards from "@/components/albums/AlbumCards";
import {format} from "date-fns";
import ArtistCards from "@/components/artists/ArtistCards";
import TitleShowAll from "@/components/ui/title-show-all";
import PlayButtonAndOther from "@/components/ui/play-button-and-other";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";

interface Props {
  params: {
    slug: string;
  };
}

export default function TracksPage({params}: Props) {
  const {data: track, isLoading, isFetching} = useRetrieveTrackQuery(params.slug)
  const genreSlug = track?.genre?.slug || null
  const artistSlug = track?.artist?.slug || null
  const albumSlug = track?.album?.slug || null
  const {
    data: recommendations,
    isLoading: isLoadingRec,
    isFetching: isFetchingRec,
  } = useListTrackQuery({genreSlug}, {skip: !genreSlug})
  const {
    data: artistTracks,
    isLoading: isLoadingArtistTracks,
    isFetching: isFetchingArtistTracks,
  } = useListTrackQuery({artistSlug}, {skip: !artistSlug})
  const {
    data: artistAlbums,
    isLoading: isLoadingA,
    isFetching: isFetchingA,
  } = useListAlbumQuery({artistSlug}, {skip: !artistSlug})
  const {
    data: relatedArtists,
    isLoading: isLoadingArtists,
    isFetching: isFetchingArtists
  } = useListArtistQuery({})
  const {
    data: trackAlbum,
    isLoading: isLoadingAlbums,
    isFetching: isFetchingAlbums
  } = useRetrieveAlbumQuery(albumSlug, {skip: !albumSlug})

  const load = (
    isLoading || isFetching || isLoadingRec || isFetchingRec ||
    isLoadingArtistTracks || isFetchingArtistTracks || isLoadingA || isFetchingA ||
    isLoadingArtists || isFetchingArtists || isLoadingAlbums || isFetchingAlbums
  )

  const trackAlbumBgColor = track?.album?.color || "#202020";

  return (
    <MainSection bgColor={trackAlbumBgColor} bgGradient="30%">
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

      <div className="mx-6 my-6 space-y-8">
        {load ? <FullScreenSpinner/> : (
          <>
            <PlayButtonAndOther
              track={track}
              isFavorite
            />

            {(recommendations?.count || 0) > 0 &&
              <TitleShowAll
                title="Recomended"
                titlePB="Based on what`s in this track"
                isShowAll={false}
              >
                <TracksTable
                  tracks={recommendations?.results.slice(0, 5)}
                  showCover
                  showSubtitle
                  showPlaysCount
                  showIndex={false}
                />
              </TitleShowAll>
            }

            {(artistTracks?.count || 0) > 0 && (
              <TitleShowAll
                titlePT="Popular Tracks by"
                title={`${track?.artist?.display_name}`}
                isShowAll={false}
              >
                <TracksTable
                  tracks={artistTracks?.results.slice(0, 5)}
                  showPlaysCount
                  showCover
                />
              </TitleShowAll>
            )}

            {(artistAlbums?.count || 0) > 0 &&
              <TitleShowAll
                title={`Popular Albums by ${track?.artist?.display_name}`}
                href={`/artists/${track?.artist?.slug}/discography/album`}
                className="mt-10"
                isShowAll={(artistAlbums?.count || 0) > 5}
              >
                <AlbumCards albums={artistAlbums?.results.slice(0, 5)}/>
              </TitleShowAll>
            }

            {(relatedArtists?.count || 0) > 0 && (
              <TitleShowAll
                title="Fans also like"
                href="/artists"
                isShowAll={(relatedArtists?.count || 0) > 5}
              >
                <ArtistCards artists={relatedArtists?.results.slice(0, 5).reverse()}/>
              </TitleShowAll>
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
          </>
        )}

        <Footer/>
      </div>
    </MainSection>
  );
}
