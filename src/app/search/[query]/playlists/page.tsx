"use client";

import {useListPlaylistQuery} from "@/lib/features/other/publicApiSlice";
import PlaylistCards from "@/components/playlists/PlaylistCards";
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
    data: searchPlaylists,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListPlaylistQuery({search: query})

  const load = isLoading || isFetching

  if (load) return <FullScreenSpinner/>

  return (
    <div>
      {(searchPlaylists?.count || 0) > 0 ? (
        <PlaylistCards playlists={searchPlaylists?.results}/>
      ) : (
        <NotFoundSearch type="Playlists" search={query}/>
      )}
    </div>
  );
}
