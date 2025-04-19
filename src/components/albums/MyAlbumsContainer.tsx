"use client";
import MyAlbumsTable from "@/components/albums/MyAlbumsTable";
import {useState} from "react";
import {useSearchParams} from "next/navigation";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import {useListMyAlbumQuery} from "@/lib/features/albums/albumApiSlice";
import {useRetrieveMeArtistQuery} from "@/lib/features/artists/artistApiSlice";
import {useListArtistMyTracksQuery} from "@/lib/features/tracks/trackApiSlice";


export function MyAlbumsContainer() {
  const [page, setPage] = useState(1)
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''

  const {data: albums, isLoading, isFetching} = useListMyAlbumQuery({page, search});
  const {
    data: tracks,
    isLoading: isLoadingT,
    isFetching: isFetchingT
  } = useListArtistMyTracksQuery({page, search});
  const {
    data: artist,
    isLoading: isLoadingA,
    isFetching: isFetchingA
  } = useRetrieveMeArtistQuery();

  const load = (isLoading || isFetching || isLoadingA || isFetchingA || isLoadingT || isFetchingT)

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col sm:py-2 sm:px-2 bg-muted/40 rounded-2xl">
        {load ? <FullScreenSpinner/> :
          <div className="flex-1 items-start">
            <MyAlbumsTable albums={albums} artist={artist} tracks={tracks} page={page} setPage={setPage}/>
          </div>
        }
      </div>
    </div>
  )
}
