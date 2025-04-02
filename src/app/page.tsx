"use client";
import ArtistCards from "@/components/general/ArtistCards";
import {useListArtistQuery} from "@/lib/features/other/publicApiSlice";
import Link from "next/link";

export default function Home() {
  const {data: topArtists, isLoading, isFetching} = useListArtistQuery()

  console.log(topArtists)
  return (
    <section className="flex flex-col items-start text-xl font-bold">
      <div className="flex items-center justify-between w-full">
        <Link href={"/artists"} className="mt-3 hover:text-white/60">Popular artists</Link>
        <Link href={"/artists"} className="text-sm mt-4 text-white/30 hover:text-white/80">Show all</Link>
      </div>
      <ArtistCards artists={topArtists?.results}/>

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

    </section>
  )
}