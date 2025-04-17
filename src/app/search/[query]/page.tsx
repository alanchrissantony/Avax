"use client";

import TracksTable from "@/components/tracks/TracksTable";
import ArtistCards from "@/components/artists/ArtistCards";
import AlbumCards from "@/components/albums/AlbumCards";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import {
  useListAlbumQuery,
  useListArtistQuery,
  useListPlaylistQuery,
  useListTrackQuery
} from "@/lib/features/other/publicApiSlice";
import TitleShowAll from "@/components/ui/title-show-all";
import TopResult from "@/components/tracks/TopResult";
import UserCards from "@/components/users/UserCards";
import NotFoundSearch from "@/components/search/not-found-search";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import {useListUsersProfileQuery} from "@/lib/features/auth/authApiSlice";

interface Props {
  params: {
    query: string;
  };
}

export default function SearchResults({params}: Props) {
  const search = decodeURI(params.query);

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


  const isFoundBySearch = (
    (searchTracks?.count || 0) +
    (searchArtists?.count || 0) +
    (searchPlaylists?.count || 0) +
    (searchProfiles?.count || 0)) > 0

  const load = (
    isLoadingT || isFetchingT || isLoadingA || isFetchingA ||
    isLoadingAl || isFetchingAl || isLoadingP || isFetchingP ||
    isLoadingPr || isFetchingPr
  )

  if (load) return <FullScreenSpinner/>
  if (!isFoundBySearch) return <NotFoundSearch type="All" search={search}/>

  return (
    <div>
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
            <TitleShowAll
              title="Songs"
              href={`/search/${search}/tracks`}
              isShowAll={false}
            >
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
          href={`/search/${search}/artists`}
          isShowAll={false}
        >
          <ArtistCards artists={searchArtists?.results.slice(0, 5)}/>
        </TitleShowAll>
      )}

      {(searchAlbums?.count || 0) > 0 && (
        <TitleShowAll
          title="Albums"
          href={`/search/${search}/albums`}
          isShowAll={false}
        >
          <AlbumCards albums={searchAlbums?.results.slice(0, 5)}/>
        </TitleShowAll>
      )}

      {(searchPlaylists?.count || 0) > 0 && (
        <TitleShowAll
          title="Playlists"
          href={`/search/${search}/playlists`}
          isShowAll={false}
        >
          <PlaylistCards playlists={searchPlaylists?.results.slice(0, 5)}/>
        </TitleShowAll>
      )}

      {(searchProfiles?.count || 0) > 0 && (
        <TitleShowAll title="Profiles">
          <UserCards users={searchProfiles?.results.slice(0, 5)}/>
        </TitleShowAll>
      )}
    </div>
  );
}
