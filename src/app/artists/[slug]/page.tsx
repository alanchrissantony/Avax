"use client";

import {BadgeCheck, Music} from "lucide-react";
import Image from "next/image";
import {useListAlbumQuery, useListTrackQuery, useRetrieveArtistQuery} from "@/lib/features/other/publicApiSlice";
import TracksTable from "@/components/tracks/TracksTable";
import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import {useAppSelector} from "@/lib/hooks";
import {Button} from "@/components/ui/button";
import AlbumCards from "@/components/albums/AlbumCards";
import {Sidebar} from "@/components/general/Siderbar";
import Header from "@/components/general/Header";
import PreviewPlayer from "@/components/tracks/PreviewPlayer";
import FooterLogin from "@/components/general/FooterLogin";
import Footer from "@/components/general/Footer";
import TrackCards from "@/components/tracks/TrackCards";

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

  const load = isLoading || isFetching || isLoadingTracks || isFetchingTracks || isLoadingAlbums || isFetchingAlbums

  const {currentTrack} = useAppSelector(state => state.track)

  return (
    <>
      <div className="grid grid-cols-10">
        <Sidebar/>
        <div
          className="flex flex-col h-[86vh] col-span-8 overflow-auto rounded-lg bg-gradient-to-b from-[#202020] via-[#131313] to-[#131313] mt-2 mr-2">
          <Header/>
          <div className=" mx-6 my-6">
            <div className="flex items-end gap-6">
              {artist && (
                <>
                  {artist.image.length > 0 ? (
                    <Image
                      src={artist.image}
                      alt={artist.display_name}
                      height={208}
                      width={208}
                      className="object-cover rounded-full w-52 h-52"
                      priority
                    />
                  ) : (
                    <div className="w-full h-40">
                      <Music size={160} className="w-full h-full bg-paper "/>
                    </div>
                  )}
                  <div className="flex flex-col items-start gap-3 w-full">
                    <div className="flex justify-between w-full">
                      <h2 className="text-5xl font-bold">{artist.display_name}</h2>

                      {artist.is_verify &&
                        <p className="flex justify-between space-x-2">
                          <BadgeCheck className="text-blue-400" size={25}/>
                          <h1 className="text-white">Verified Artist</h1>
                        </p>
                      }
                    </div>
                    <span className="text-sm">
                {/*{artist.followers.total.toLocaleString()} followers*/}
                      {"<LISENERS COUNT>"}
              </span>
                    <div className="flex items-center gap-5 text-sm">
                      {/*{artist.genres.map((genre: string) => (*/}
                      {/*  <span*/}
                      {/*    key={genre}*/}
                      {/*    className="px-4 py-1 text-xs capitalize rounded-full bg-paper-600 hover:bg-paper-400"*/}
                      {/*  >*/}
                      {/*    {genre}*/}
                      {/*  </span>*/}
                      {/*))}*/}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center space-x-6 py-4">
              <PlayTrackButton track={currentTrack || undefined} variant="filled" className="w-14 h-14 text-4xl"/>
              <Button variant="ghost"
                      className="rounded-full border border-white/30 h-8 w-19 hover:bg-inherit hover:border-white font-semibold hover:scale-105 duration-150">
                Follow
              </Button>
            </div>

            {(artistTracks?.count || 0) > 0 && (
              <div className="mt-4">
                <h1 className="font-semibold text-2xl ml-2">Popular</h1>
                <TracksTable tracks={artistTracks?.results.slice(0, 5)} showCover showPlaysCount/>
              </div>
            )}

            {(artistAlbums?.count || 0) > 0 && (
              <div className="mt-12">
                <h1 className="font-semibold text-2xl ml-2">Albums</h1>
                <AlbumCards albums={artistAlbums?.results.slice(0, 5)}/>
              </div>
            )}

            {(artistTracks?.count || 0) > 0 && (
              <div className="mt-12">
                <h1 className="font-semibold text-2xl ml-2">Popular releases</h1>
                <TrackCards tracks={artistTracks?.results.slice(0, 5)}/>
              </div>
            )}

            {/*{artistCompilation?.items.length > 0 && (*/}
            {/*  <div className="mt-12">*/}
            {/*    <h1>Compilation</h1>*/}
            {/*    <AlbumCards albums={artistCompilation.items} />*/}
            {/*  </div>*/}
            {/*)}*/}

            {/*{relatedArtists?.artists.length > 0 && (*/}
            {/*  <div className="mt-12">*/}
            {/*    <h1>Fans also like</h1>*/}
            {/*    <ArtistCards artists={relatedArtists.artists} />*/}
            {/*  </div>*/}
            {/*)}*/}

            <Footer/>
          </div>
        </div>
      </div>
      {currentTrack ? <PreviewPlayer/> : <FooterLogin/>}
    </>
  );
}
