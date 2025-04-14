"use client";

import TracksTable from "@/components/tracks/TracksTable";
import ArtistCards from "@/components/artists/ArtistCards";
import AlbumCards from "@/components/albums/AlbumCards";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import MainSection from "@/components/general/main-section";
import {
  useListAlbumQuery,
  useListArtistQuery,
  useListPlaylistQuery,
  useListTrackQuery, useListUsersProfileQuery
} from "@/lib/features/other/publicApiSlice";
import TitleShowAll from "@/components/ui/title-show-all";
import SearchFilters from "@/components/ui/SearchFilters";
import TopResult from "@/components/tracks/TopResult";
import Footer from "@/components/general/Footer";
import UserCards from "@/components/users/UserCards";

interface Props {
  params: {
    query: string;
  };
}

export default function SearchResults({params}: Props) {
  const search = decodeURI(params.query);

  console.log(search)

  const {
    data: searchTracks,
    isLoading: isLoadingT,
    isFetching: isFetchingT,
  } = useListTrackQuery({search})
  const {
    data: searchArtists,
    isLoading: isLoadingA,
    isFetching: isFetchingA,
  } = useListArtistQuery({search})
  const {
    data: searchAlbums,
    isLoading: isLoadingAl,
    isFetching: isFetchingAl,
  } = useListAlbumQuery({search})
  const {
    data: searchPlaylists,
    isLoading: isLoadingP,
    isFetching: isFetchingP,
  } = useListPlaylistQuery({search})
  const {
    data: searchProfiles,
    isLoading: isLoadingPr,
    isFetching: isFetchingPr,
  } = useListUsersProfileQuery({search})


  const load = (
    isLoadingT || isFetchingT || isLoadingA || isFetchingA ||
    isLoadingAl || isFetchingAl || isLoadingP || isFetchingP ||
    isLoadingPr || isFetchingPr
  )

  return (
    <MainSection bgColor="#161616">
      <div className="mx-6 my-6 mt-4 space-y-8">
        <SearchFilters/>

        {(searchTracks?.count || 0) > 0 && (
          <div className="lg:grid lg:grid-cols-3 gap-2">
            <div className="col-span-1">
              <TitleShowAll title="Top result">
                <TopResult
                  track={searchTracks?.results?.[0]}
                  type="Song"
                />
              </TitleShowAll>
            </div>

            <div className="col-span-2">
              <TitleShowAll title="Songs">
                <TracksTable
                  tracks={searchTracks?.results?.slice(0, 6)}
                  showCover
                  showSubtitle
                  showIndex={false}
                />
              </TitleShowAll>
            </div>
          </div>
        )}


        {(searchArtists?.count || 0) > 0 && (
          <TitleShowAll
            title="Artists"
            href="/artists"
            isShowAll={false}
          >
            <ArtistCards artists={searchArtists?.results.slice(0, 5)}/>
          </TitleShowAll>
        )}

        {(searchAlbums?.count || 0) > 0 && (
          <TitleShowAll
            title="Albums"
            href="/albums"
            isShowAll={false}
          >
            <AlbumCards albums={searchAlbums?.results.slice(0, 5)}/>
          </TitleShowAll>
        )}

        {(searchPlaylists?.count || 0) > 0 && (
          <TitleShowAll
            title="Playlists"
            href="/playlists"
            isShowAll={false}
          >
            <PlaylistCards playlists={searchPlaylists?.results.slice(0, 5)}/>
          </TitleShowAll>
        )}

        {(searchProfiles?.count || 0) > 0 && (
          <TitleShowAll
            title="Profiles"
            href="/users"
            isShowAll={false}
          >
            <UserCards users={searchProfiles?.results.slice(0, 5)}/>
          </TitleShowAll>
        )}

        <Footer/>
      </div>
    </MainSection>
  );
}
