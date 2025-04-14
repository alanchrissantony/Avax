"use client";

import {useListArtistQuery} from "@/lib/features/other/publicApiSlice";
import ArtistCards from "@/components/artists/ArtistCards";
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
    data: searchArtists,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListArtistQuery({search: query})

  const load = isLoading || isFetching

  if (load) return <FullScreenSpinner/>

  return (
    <div>
      {(searchArtists?.count || 0) > 0 ? (
        <ArtistCards artists={searchArtists?.results}/>
      ) : (
        <NotFoundSearch type="Artists" search={query}/>
      )}
    </div>
  );
}
