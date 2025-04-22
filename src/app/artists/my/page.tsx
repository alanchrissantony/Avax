"use client";

import {BadgeCheck} from "lucide-react";
import {
  useListArtistQuery
} from "@/lib/features/other/publicApiSlice";
import TracksTable from "@/components/tracks/TracksTable";
import {useAppSelector} from "@/lib/hooks";
import AlbumCards from "@/components/albums/AlbumCards";
import TrackCards from "@/components/tracks/TrackCards";
import ArtistCards from "@/components/artists/ArtistCards";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import TitleShowAll from "@/components/ui/title-show-all";
import PlayButtonAndOther from "@/components/ui/play-button-and-other";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import ContentSection from "@/components/general/content-section";
import {useRetrieveMeArtistQuery} from "@/lib/features/artists/artistApiSlice";
import {useListMyTracksQuery} from "@/lib/features/tracks/trackApiSlice";
import {useListMyAlbumQuery} from "@/lib/features/albums/albumApiSlice";
import {useListMyPlaylistQuery} from "@/lib/features/playlists/playlistApiSlice";
import ArtistMyDialogDropdown from "@/components/artists/ArtistMyDialogDropdown";


export default function Page() {
  const {data: artist, isLoading, isFetching} = useRetrieveMeArtistQuery({})
  const {
    data: artistTracks,
    isLoading: isLoadingTracks,
    isFetching: isFetchingTracks
  } = useListMyTracksQuery({})
  const {
    data: artistAlbums,
    isLoading: isLoadingAlbums,
    isFetching: isFetchingAlbums
  } = useListMyAlbumQuery({})
  const {
    data: artistPlaylists,
    isLoading: isLoadingPlaylists,
    isFetching: isFetchingPlaylists
  } = useListMyPlaylistQuery({})
  const {
    data: relatedArtists,
    isLoading: isLoadingArtists,
    isFetching: isFetchingArtists
  } = useListArtistQuery({})

  const load = (
    isLoading || isFetching || isLoadingTracks || isFetchingTracks ||
    isLoadingAlbums || isFetchingAlbums || isLoadingArtists || isFetchingArtists ||
    isLoadingPlaylists || isFetchingPlaylists
  )

  const {activeTrack, currentIndex} = useAppSelector(state => state.track)

  const artistBgColor = artist?.color || "#202020";

  return (
    <MainSection bgColor={artistBgColor} bgGradient="30%">
      <div
        className="h-64 relative"
        style={{
          backgroundImage: `url(${artist?.image || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30"></div>
        <div className="flex items-end gap-6 p-4 pb-6 h-full">
          {artist && (
            <div className="flex flex-col items-start gap-3 self-end">
              {artist.is_verify && (
                <div className="flex justify-between items-center space-x-2 drop-shadow-md">
                  <BadgeCheck className="text-blue-400" size={25}/>
                  <h1 className="text-white text-sm font-medium">Verified Artist</h1>
                </div>
              )}
              <h2
                className="text-5xl sm:text-6xl xl:text-7xl font-bold drop-shadow-md text-white">{artist.display_name}</h2>
              <span className="text-base font-medium drop-shadow-md">
                {artist.artist_listeners.toLocaleString()} listeners
              </span>
            </div>
          )}
        </div>
      </div>

      <ContentSection>
        {load ? <FullScreenSpinner/> : (
          <>
            <div className="flex items-center space-x-6">
              <PlayButtonAndOther
                track={artistTracks?.results?.[currentIndex] || (activeTrack || undefined)}
                tracks={artistTracks?.results}
                index={currentIndex}
              />
              <ArtistMyDialogDropdown artist={artist}/>
            </div>

            {(artistTracks?.count || 0) > 0 && (
              <div className="mt-6">
                <TitleShowAll title="Popular" isShowAll={false}>
                  <TracksTable tracks={artistTracks?.results.slice(0, 5)} showCover showPlaysCount/>
                </TitleShowAll>
              </div>
            )}

            {(artistAlbums?.count || 0) > 0 && (
              <TitleShowAll
                title="Albums"
                href={`/artists/${artist?.slug}/discography/album`}
                isShowAll={(artistAlbums?.count || 0) > 5}
              >
                <AlbumCards albums={artistAlbums?.results.slice(0, 5)}/>
              </TitleShowAll>
            )}

            {(artistPlaylists?.count || 0) > 0 && (
              <TitleShowAll
                title="Artist Playlists"
                href={`/artists/${artist?.slug}/playlists?id=${artist?.user?.id}&name=${artist?.display_name}`}
                isShowAll={(artistAlbums?.count || 0) > 5}
              >
                <PlaylistCards playlists={artistPlaylists?.results.slice(0, 5)}/>
              </TitleShowAll>
            )}

            {(artistTracks?.count || 0) > 0 && (
              <TitleShowAll
                title="Popular releases"
                href={`/artists/${artist?.slug}/tracks`}
                isShowAll={(artistTracks?.count || 0) > 5}
              >
                <TrackCards tracks={artistTracks?.results.slice(0, 5)}/>
              </TitleShowAll>
            )}

            {(relatedArtists?.count || 0) > 0 && (
              <TitleShowAll
                title="Fans also like"
                href={`/artists`}
                isShowAll={(relatedArtists?.count || 0) > 5}
              >
                <ArtistCards artists={relatedArtists?.results.slice(0, 5).reverse()}/>
              </TitleShowAll>
            )}
          </>
        )}
      </ContentSection>
    </MainSection>
  );
}
