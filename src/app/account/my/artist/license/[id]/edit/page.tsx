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
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import {useRetrieveMeArtistLicenseQuery} from "@/lib/features/artists/artistApiSlice";
import {LicenseEditForm} from "@/components/forms/license-edit-form";

export default function Page({params}: { params: { id: number } }) {
  const {
    data: license,
    isLoading: isLoadingL,
    isFetching: isFetchingL,
  } = useRetrieveMeArtistLicenseQuery({id: params.id})

  const isLoading = (isLoadingL || isFetchingL)

  const router = useRouter();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList className='text-l'>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <h1 onClick={() => router.replace('/account/my/artist/license')}>License</h1>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Edit License</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-6">
        <Separator className="mt-5 mb-3"/>
        <div>
          <h3 className="text-lg font-medium">Edit License</h3>
        </div>
        <Separator/>
        {isLoading ? <FullScreenSpinner/> : (
          <LicenseEditForm license={license}/>
        )}
      </div>
    </>
  )
}