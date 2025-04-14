"use client";
import ArtistCards from "@/components/artists/ArtistCards";
import {
  useListAlbumQuery,
  useListArtistQuery,
  useListPlaylistQuery,
  useListTrackQuery
} from "@/lib/features/other/publicApiSlice";
import Link from "next/link";
import AlbumCards from "@/components/albums/AlbumCards";
import TrackCards from "@/components/tracks/TrackCards";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import TrackCardsLittle from "@/components/tracks/TrackCardsLittle";
import Footer from "@/components/general/Footer";
import {useAppSelector} from "@/lib/hooks";
import {useEffect, useState} from "react";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


export default function Home() {
  const {data: topArtists, isLoading, isFetching} = useListArtistQuery({})
  const {data: topAlbums, isLoading: isLoadingAlbums, isFetching: isFetchingAlbums} = useListAlbumQuery({})
  const {data: topTracks, isLoading: isLoadingTrack, isFetching: isFetchingTrack} = useListTrackQuery({})
  const {data: topPlaylists, isLoading: isLoadingPlaylist, isFetching: isFetchingPlaylist} = useListPlaylistQuery({})

  const load = (
    isLoading || isFetching || isLoadingAlbums || isFetchingAlbums ||
    isLoadingTrack || isFetchingTrack || isLoadingPlaylist || isFetchingPlaylist
  )

  const {activeTrack} = useAppSelector(state => state.track)

  const [backgroundColor, setBackgroundColor] = useState("#202020");

  useEffect(() => {
    if (activeTrack) {
      setBackgroundColor(activeTrack.album.color || "#202020");
    }
  }, [activeTrack]);

  return (
    <MainSection bgColor={backgroundColor} bgGradient="25%">
      <section className="flex flex-col items-start text-2xl font-bold space-y-8 mx-6 my-6">

        {load ? <FullScreenSpinner/> : (
          <>
            <div>
              <div className="flex items-center">
                <Link href={"/tracks"} className="mt-4 ml-4">Top tracks</Link>
              </div>
              <TrackCardsLittle tracks={topTracks?.results.slice(0, 6)}/>
            </div>

            <TitleShowAll title="Popular artists" href="/artists">
              <ArtistCards artists={topArtists?.results.slice(0, 5)}/>
            </TitleShowAll>

            <TitleShowAll title="Popular albums" href="/albums">
              <AlbumCards albums={topAlbums?.results.slice(0, 5)}/>
            </TitleShowAll>

            <TitleShowAll title="Popular playlists" href="/playlists">
              <PlaylistCards playlists={topPlaylists?.results.slice(0, 5)}/>
            </TitleShowAll>

            <TitleShowAll title="Popular tracks" href="/tracks">
              <TrackCards tracks={topTracks?.results.slice(0, 5)}/>
            </TitleShowAll>
          </>
        )}

        <Footer/>
      </section>
    </MainSection>
  )
}