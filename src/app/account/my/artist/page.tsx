"use client";

import {Separator} from "@/components/ui/separator"
import {useRetrieveMeArtistQuery} from "@/lib/features/artists/artistApiSlice";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import {ArtistForm} from "@/components/forms/artist-form";

export default function Page() {
  const {data: artist, isLoading, isFetching} = useRetrieveMeArtistQuery({})


  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Artist Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your Artist Profile account.
        </p>
      </div>
      <Separator/>
      {isLoading || isFetching ? <FullScreenSpinner/> :
        <ArtistForm artist={artist}/>
      }
    </div>
  )
}