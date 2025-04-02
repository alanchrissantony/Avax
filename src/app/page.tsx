"use client";
import ArtistCards from "@/components/artists/ArtistCards";
import {useListAlbumQuery, useListArtistQuery} from "@/lib/features/other/publicApiSlice";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Globe} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import AlbumCards from "@/components/albums/AlbumCards";

export default function Home() {
  const {data: topArtists, isLoading, isFetching} = useListArtistQuery()
  const {data: topAlbums, isLoading: isLoadingAlbums, isFetching: isFetchingAlbums} = useListAlbumQuery()
  console.log(topArtists)


  const load = isLoading || isFetching || isLoadingAlbums || isFetchingAlbums;

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
    <section className="flex flex-col items-start text-xl font-bold">
      <div>
        <div className="flex items-center justify-between w-full mb-2">
          <Link href={"/artists"} className="mt-3 hover:text-white/60">Popular artists</Link>
          <Link href={"/artists"} className="text-sm mt-4 text-white/30 hover:text-white/80">Show all</Link>
        </div>
        <ArtistCards artists={topArtists?.results.slice(0, 5)}/>
      </div>

      <div>
        <div className="flex items-center justify-between w-full mb-2">
          <Link href={"/albums"} className="mt-3 hover:text-white/60">Popular albums</Link>
          <Link href={"/albums"} className="text-sm mt-4 text-white/30 hover:text-white/80">Show all</Link>
        </div>
        <AlbumCards albums={topAlbums?.results.slice(0, 5)}/>
      </div>

      <h1 className="mt-8">Top Tracks</h1>
      <div className="grid w-full grid-cols-12 gap-4">
        {/*{topTracks.map((track) => (*/}
        {/*  <Link*/}
        {/*    href={`/tracks/${track.id}`}*/}
        {/*    key={track.id}*/}
        {/*    className="flex items-center justify-between col-span-4 pr-4 truncate rounded-md group/item bg-paper-600 hover:bg-paper-400"*/}
        {/*  >*/}
        {/*    <div className="flex items-center gap-4">*/}
        {/*      {track.album.images.length > 0 ? (*/}
        {/*        <Image*/}
        {/*          src={track.album.images[0].url}*/}
        {/*          alt={track.name}*/}
        {/*          width={72}*/}
        {/*          height={72}*/}
        {/*          className="object-cover h-full rounded-tl-md rounded-bl-md aspect-square"*/}
        {/*        />*/}
        {/*      ) : (*/}
        {/*        <Album size={20}/>*/}
        {/*      )}*/}
        {/*      <h3 className="font-semibold truncate">{track.name}</h3>*/}
        {/*    </div>*/}

        {/*    <PlayTrackButton*/}
        {/*      track={track}*/}
        {/*      variant="filled"*/}
        {/*      className="invisible w-12 h-12 text-3xl group/btn group-hover/item:visible"*/}
        {/*    />*/}
        {/*  </Link>*/}
        {/*))}*/}
      </div>

      <h1 className="mt-16">Recently played</h1>
      {/*<TrackCards tracks={recentlyPlayed}/>*/}

      <h1 className="mt-16">Time Capsule</h1>
      {/*<TrackCards tracks={allTimeTopTracks}/>*/}

      <h1 className="mt-16">Top Artists</h1>
      {/*<ArtistCards artists={topArtists}/>*/}

      <h1 className="mt-16">New releases</h1>
      {/*<AlbumCards albums={newReleases}/>*/}

      <h1 className="mt-16">New releases</h1>
      <h1 className="mt-16">New releases</h1>
      <h1 className="mt-16">New releases</h1>
      <h1 className="mt-16">New releases</h1>
      <h1 className="mt-16">New releases</h1>
      <h1 className="mt-16">New releases</h1>
      <h1 className="mt-16">New releases</h1>

      <footer>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 p-4 pt-10 text-xs text-muted-foreground">
          <a href="#" className="block">
            Legal
          </a>
          <a href="#" className="block">
            Safety & Privacy Center
          </a>
          <a href="#" className="block">
            Privacy Policy
          </a>
          <a href="#" className="block">
            Cookies
          </a>
          <a href="#" className="block">
            About Ads
          </a>
          <a href="#" className="block">
            Accessibility
          </a>
        </div>
      </footer>

    </section>
  )
}