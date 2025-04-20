"use client";
import {useState} from "react";
import {useSearchParams} from "next/navigation";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import {useListMyTracksQuery} from "@/lib/features/tracks/trackApiSlice";
import MyTracksTable from "@/components/tracks/MyTracksTable";
import {useListMyAlbumQuery} from "@/lib/features/albums/albumApiSlice";
import {useListMeArtistLicenseQuery} from "@/lib/features/artists/artistApiSlice";


export function MyTracksContainer() {
  const [page, setPage] = useState(1)
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''

  const {
    data: albums,
    isLoading: isLoadingA,
    isFetching: isFetchingA
  } = useListMyAlbumQuery({})
  const {
    data: tracks,
    isLoading: isLoadingT,
    isFetching: isFetchingT
  } = useListMyTracksQuery({page, search});
  const {
    data: license,
    isLoading: isLoadingL,
    isFetching: isFetchingL
  } = useListMeArtistLicenseQuery({});

  const isLoading = (isLoadingA || isFetchingA || isLoadingT || isFetchingT || isLoadingL || isFetchingL)

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col sm:py-2 sm:px-2 bg-muted/40 rounded-2xl">
        {isLoading ? <FullScreenSpinner/> :
          <div className="flex-1 items-start">
            <MyTracksTable tracks={tracks} albums={albums} license={license} page={page} setPage={setPage}/>
          </div>
        }
      </div>
    </div>
  )
}
