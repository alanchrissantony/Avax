"use client";

import {useListAlbumQuery} from "@/lib/features/other/publicApiSlice";
import AlbumCards from "@/components/albums/AlbumCards";
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
    data: searchAlbums,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListAlbumQuery({search: query})

  const load = isLoading || isFetching

  if (load) return <FullScreenSpinner/>

  return (
    <div>
      {(searchAlbums?.count || 0) > 0 ? (
        <AlbumCards albums={searchAlbums?.results}/>
      ) : (
        <NotFoundSearch type="Albums" search={query}/>
      )}
    </div>
  );
}
