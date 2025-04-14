"use client";

import {useListTrackQuery} from "@/lib/features/other/publicApiSlice";
import TracksTable from "@/components/tracks/TracksTable";
import NotFoundSearch from "@/components/search/not-found-search";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


interface Props {
  params: {
    query: string;
  };
}

export default function Page({params}: Props) {
  const query = params.query;

  const {
    data: searchTracks,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListTrackQuery({search: query})

  const load = isLoading || isFetching

  if (load) return <FullScreenSpinner/>

  return (
    <div>
      {(searchTracks?.count || 0) > 0 ? (
        <TracksTable
          tracks={searchTracks?.results}
          showCover
          showSubtitle
          showAlbum
          showHeader
        />
      ) : (
        <NotFoundSearch type="Songs" search={query}/>
      )}
    </div>
  );
}
