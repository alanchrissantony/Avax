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
import {useAppSelector} from "@/lib/hooks";
import {useEffect, useState} from "react";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import ContentSection from "@/components/general/content-section";
import {useListUserTracksLikedQuery} from "@/lib/features/tracks/trackApiSlice";
import {getGreeting} from "@/utils/clientUtils";
import {Skeleton} from "@/components/ui/skeleton";


export default function Home() {
  const {isAuthenticated} = useAppSelector(state => state.auth)
  const {data: topArtists, isLoading, isFetching} = useListArtistQuery({})
  const {data: topAlbums, isLoading: isLoadingAlbums, isFetching: isFetchingAlbums} = useListAlbumQuery({})
  const {data: topTracks, isLoading: isLoadingTrack, isFetching: isFetchingTrack} = useListTrackQuery({})
  const {
    data: likedTracks,
    isLoading: isLoadingTrackL,
    isFetching: isFetchingTrackL
  } = useListUserTracksLikedQuery({}, {skip: !isAuthenticated});
  const {data: topPlaylists, isLoading: isLoadingPlaylist, isFetching: isFetchingPlaylist} = useListPlaylistQuery({})

  const load = (
    isLoading || isFetching || isLoadingAlbums || isFetchingAlbums ||
    isLoadingTrack || isFetchingTrack || isLoadingPlaylist || isFetchingPlaylist ||
    isLoadingTrackL || isFetchingTrackL
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
      <ContentSection>
        <section className="flex flex-col items-start space-y-8 text-2xl font-bold">

          {(
            <>
              <div className="w-full">
                {load ? <Skeleton className="mt-4 ml-4 h-7 w-32 sm:w-48"/> : (
                <div className="flex items-center">
                  <Link href={"/tracks"}
                        className="mt-4 ml-4">{isAuthenticated ? `Good ${getGreeting()}` : 'Top tracks'}</Link>
                </div>
                  )}
                <TrackCardsLittle
                  tracks={topTracks?.results.slice(0, isAuthenticated ? 7 : 8)}
                  tracksCollection={likedTracks?.results}
                  isLoading={load}
                />
              </div>

              <TitleShowAll title="Popular artists" href="/artists" isLoading={load}>
                <ArtistCards artists={topArtists?.results.slice(0, 5)} isLoading={load}/>
              </TitleShowAll>

              <TitleShowAll title="Popular albums" href="/albums" isLoading={load}>
                <AlbumCards albums={topAlbums?.results.slice(0, 5)} isLoading={load}/>
              </TitleShowAll>

              <TitleShowAll title="Popular playlists" href="/playlists" isLoading={load}>
                <PlaylistCards playlists={topPlaylists?.results.slice(0, 5)} isLoading={load}/>
              </TitleShowAll>

              <TitleShowAll title="Popular tracks" href="/tracks" isLoading={load}>
                <TrackCards tracks={topTracks?.results.slice(0, 5)} isLoading={load}/>
              </TitleShowAll>
            </>
          )}

        </section>
      </ContentSection>
    </MainSection>
  )
}