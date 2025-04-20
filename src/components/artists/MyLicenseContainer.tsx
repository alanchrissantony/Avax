"use client";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import MyLicenseTable from "@/components/artists/MyLicenseTable";
import {useListMeArtistLicenseQuery} from "@/lib/features/artists/artistApiSlice";


export function MyLicenseContainer() {
  const {data: license, isLoading, isFetching} = useListMeArtistLicenseQuery({});

  const load = (isLoading || isFetching)

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col sm:py-2 sm:px-2 bg-muted/40 rounded-2xl">
        {load ? <FullScreenSpinner/> :
          <div className="flex-1 items-start">
            <MyLicenseTable license={license}/>
          </div>
        }
      </div>
    </div>
  )
}
