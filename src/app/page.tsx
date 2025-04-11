"use client";
import ArtistCards from "@/components/artists/ArtistCards";
import {
  useListAlbumQuery,
  useListArtistQuery,
  useListPlaylistQuery,
  useListTrackQuery
} from "@/lib/features/other/publicApiSlice";
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton";
import AlbumCards from "@/components/albums/AlbumCards";
import TrackCards from "@/components/tracks/TrackCards";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import TrackCardsLittle from "@/components/tracks/TrackCardsLittle";
import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import {useAppSelector} from "@/lib/hooks";
import {useEffect, useState} from "react";


export default function Home() {
  const {data: topArtists, isLoading, isFetching} = useListArtistQuery({})
  const {data: topAlbums, isLoading: isLoadingAlbums, isFetching: isFetchingAlbums} = useListAlbumQuery({})
  const {data: topTracks, isLoading: isLoadingTrack, isFetching: isFetchingTrack} = useListTrackQuery({})
  const {data: topPlaylists, isLoading: isLoadingPlaylist, isFetching: isFetchingPlaylist} = useListPlaylistQuery({})

  const load = isLoading || isFetching || isLoadingAlbums || isFetchingAlbums || isLoadingTrack || isFetchingTrack || isLoadingPlaylist || isFetchingPlaylist;

  const {activeTrack} = useAppSelector(state => state.track)

  const [backgroundColor, setBackgroundColor] = useState("#202020");

  useEffect(() => {
    if (activeTrack) {
      setBackgroundColor(activeTrack.album.color || "#202020");
    }
  }, [activeTrack]);

  let loader = null;
  if (load) {
    loader = (
      <div>
        {Array.from('1234567890').map((_, index) =>
          <div key={index}>
            <div className='bg-gray-900 bg-muted/30 rounded-2xl p-4'>
              <div className='grid gap-2'>
                <div className='flex justify-center items-center w-full'>
                  <Skeleton className="h-7 w-7 rounded-full ml-4"/>
                  <Skeleton className="h-7 w-24 rounded-full ml-2"/>
                  <Skeleton className="h-7 w-7 rounded-xl ml-auto"/>
                </div>
                <Skeleton className="h-8 w-60 lg:w-72 rounded-2xl ml-2"/>
                <Skeleton className="h-6 w-72 lg:w-96 rounded-2xl ml-2"/>
                <Skeleton className="h-28 w-full rounded-2xl mt-2"/>
              </div>
              <div className='flex justify-center items-center w-full mt-4'>
                <Skeleton className="h-8 w-36 rounded-2xl ml-2"/>
                <Skeleton className="h-8 w-28 rounded-2xl ml-auto"/>
              </div>
            </div>
            <br/>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="h-full rounded-lg"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${backgroundColor} 0%, rgba(19, 19, 19, 0.9) 25%, #131313 100%)`,
      }}
    >
      <Header/>

      <section className="flex flex-col items-start text-2xl font-bold space-y-4 mx-6 my-6">

        <div className="flex items-center">
          <Link href={"/tracks"} className="mt-4 ml-4">Top tracks</Link>
        </div>
        <TrackCardsLittle tracks={topTracks?.results.slice(0, 6)}/>

        <div>
          <div className="flex items-center justify-between w-full mb-2">
            <Link href={"/artists"} className="mt-3 hover:text-white/60 ml-4">Popular artists</Link>
            <Link href={"/artists"} className="text-sm mt-4 text-white/30 hover:text-white/80">Show all</Link>
          </div>
          <ArtistCards artists={topArtists?.results.slice(0, 5)}/>
        </div>

        <div>
          <div className="flex items-center justify-between w-full mb-2">
            <Link href={"/albums"} className="mt-3 hover:text-white/60 ml-4">Popular albums</Link>
            <Link href={"/albums"} className="text-sm mt-4 text-white/30 hover:text-white/80">Show all</Link>
          </div>
          <AlbumCards albums={topAlbums?.results.slice(0, 5)}/>
        </div>

        <div>
          <div className="flex items-center justify-between w-full mb-2">
            <Link href={"/playlists"} className="mt-3 hover:text-white/60 ml-4">Popular playlists</Link>
            <Link href={"/playlists"} className="text-sm mt-4 text-white/30 hover:text-white/80">Show all</Link>
          </div>
          <PlaylistCards playlists={topPlaylists?.results.slice(0, 5)}/>
        </div>

        <div>
          <div className="flex items-center justify-between w-full mb-2">
            <Link href={"/tracks"} className="mt-3 hover:text-white/60 ml-4">Popular tracks</Link>
            <Link href={"/tracks"} className="text-sm mt-4 text-white/30 hover:text-white/80">Show all</Link>
          </div>
          <TrackCards tracks={topTracks?.results.slice(0, 5)}/>
        </div>


        <Footer/>
      </section>
    </div>
  )
}