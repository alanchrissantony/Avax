"use client";
import {Separator} from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {useRouter} from "next/navigation";
import {TrackCreateForm} from "@/components/forms/track-create-form";
import {useListMyAlbumQuery} from "@/lib/features/albums/albumApiSlice";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import {useListMeArtistLicenseQuery} from "@/lib/features/artists/artistApiSlice";
import {useListGenresQuery} from "@/lib/features/other/publicApiSlice";

export default function Page() {
  const {
    data: albums,
    isLoading: isLoadingA,
    isFetching: isFetchingA,
  } = useListMyAlbumQuery({})
  const {
    data: license,
    isLoading: isLoadingL,
    isFetching: isFetchingL,
  } = useListMeArtistLicenseQuery({})
  const {
    data: genres,
    isLoading: isLoadingG,
    isFetching: isFetchingG,
  } = useListGenresQuery({})

  const isLoading = isLoadingA || isFetchingA || isLoadingL || isFetchingL || isLoadingG || isFetchingG;

  const router = useRouter();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList className='text-l'>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <h1 onClick={() => router.replace(`/account/my/artist/tracks`)}>Tracks</h1>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Create Track</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-6">
        <Separator className="mt-5 mb-3"/>
        <div>
          <h3 className="text-lg font-medium">Create Track</h3>
        </div>
        <Separator/>
        {isLoading ? <FullScreenSpinner/> : (
          <TrackCreateForm albums={albums} license={license} genres={genres}/>
        )}
      </div>
    </>
  )
}