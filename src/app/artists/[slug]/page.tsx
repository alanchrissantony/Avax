"use client";

import {BadgeCheck} from "lucide-react";
import {
  useListAlbumQuery,
  useListArtistQuery,
  useListTrackQuery,
  useRetrieveArtistQuery
} from "@/lib/features/other/publicApiSlice";
import TracksTable from "@/components/tracks/TracksTable";
import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import {useAppSelector} from "@/lib/hooks";
import {Button} from "@/components/ui/button";
import AlbumCards from "@/components/albums/AlbumCards";
import Header from "@/components/general/Header";
import PreviewPlayer from "@/components/tracks/PreviewPlayer";
import FooterLogin from "@/components/general/FooterLogin";
import Footer from "@/components/general/Footer";
import TrackCards from "@/components/tracks/TrackCards";
import Link from "next/link";
import ArtistCards from "@/components/artists/ArtistCards";

interface Props {
  params: {
    slug: string;
  };
}

export default function ArtistPage({params}: Props) {
  const {data: artist, isLoading, isFetching} = useRetrieveArtistQuery(params.slug)
  const {
    data: artistTracks,
    isLoading: isLoadingTracks,
    isFetching: isFetchingTracks
  } = useListTrackQuery({artistSlug: params.slug})
  const {
    data: artistAlbums,
    isLoading: isLoadingAlbums,
    isFetching: isFetchingAlbums
  } = useListAlbumQuery({artistSlug: params.slug})
  const {
    data: relatedArtists,
    isLoading: isLoadingArtists,
    isFetching: isFetchingArtists
  } = useListArtistQuery()

  const load = isLoading || isFetching || isLoadingTracks || isFetchingTracks || isLoadingAlbums || isFetchingAlbums || isLoadingArtists || isFetchingArtists

  const {activeTrack, currentIndex} = useAppSelector(state => state.track)

  const darkenBgColor = artist?.color || "#202020";

  return (
    <>
      <div
        className="h-full rounded-lg"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${darkenBgColor} 0%,  rgba(19, 19, 19, 0.9) 30%, #131313 100%)`,
        }}
      >
        <Header/>
        <div
          className="h-64"
          style={{
            backgroundImage: `url(${artist?.image || ''})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex items-end gap-6 p-4 pb-6 h-full">
            {artist && (
              <div className="flex flex-col items-start gap-3 self-end">
                {artist.is_verify && (
                  <p className="flex justify-between items-center space-x-2">
                    <BadgeCheck className="text-blue-400" size={25}/>
                    <h1 className="text-white text-sm font-medium">Verified Artist</h1>
                  </p>
                )}
                <h2 className="text-7xl font-bold">{artist.display_name}</h2>
                <span className="text-base font-medium">
          {artist.artist_listeners.toLocaleString()} listeners
        </span>
              </div>
            )}
          </div>
        </div>

        <div className=" mx-6 my-6">
          <div className="flex items-center space-x-6">
            <PlayTrackButton track={artistTracks?.results?.[currentIndex] || (activeTrack || undefined)}
                             tracks={artistTracks?.results} index={currentIndex} variant="filled"
                             className="w-14 h-14 text-4xl"/>
            <Button variant="ghost"
                    className="rounded-full border border-white/30 h-8 w-19 hover:bg-inherit hover:border-white font-semibold hover:scale-105 duration-150">
              Follow
            </Button>
          </div>

          {(artistTracks?.count || 0) > 0 && (
            <div className="mt-6">
              <h1 className="font-semibold text-2xl ml-2">Popular</h1>
              <TracksTable tracks={artistTracks?.results.slice(0, 5)} showCover showPlaysCount/>
            </div>
          )}

          {(artistAlbums?.count || 0) > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between w-full mb-2">
                <Link href={`/artists/${artist?.slug}/albums`}
                      className="mt-3 font-semibold text-2xl hover:text-white/60 ml-2">Albums</Link>
                <Link href={`/artists/${artist?.slug}/albums`}
                      className="text-sm mt-4 text-white/30 hover:text-white/80">Show all</Link>
              </div>
              <AlbumCards albums={artistAlbums?.results.slice(0, 5)}/>
            </div>
          )}

          {(artistTracks?.count || 0) > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between w-full mb-2">
                <Link href={`/artists/${artist?.slug}/tracks`}
                      className="mt-3 font-semibold text-2xl hover:text-white/60 ml-2">Popular releases</Link>
                <Link href={`/artists/${artist?.slug}/tracks`}
                      className="text-sm mt-4 text-white/30 hover:text-white/80">Show all</Link>
              </div>
              <TrackCards tracks={artistTracks?.results.slice(0, 5)}/>
            </div>
          )}

          {(relatedArtists?.count || 0) > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between w-full mb-2">
                <Link href={`/artists`}
                      className="mt-3 font-semibold text-2xl hover:text-white/60 ml-2">Fans also like</Link>
                <Link href={`/artists`}
                      className="text-sm mt-4 text-white/30 hover:text-white/80">Show all</Link>
              </div>
              <ArtistCards artists={relatedArtists?.results.slice(0, 5).reverse()}/>
            </div>
          )}

          <Footer/>
        </div>
      </div>
      {activeTrack ? <PreviewPlayer/> : <FooterLogin/>}
    </>
  );
}
