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
import {AlbumEditForm} from "@/components/forms/album-edit-form";
import {useRetrieveMyAlbumQuery} from "@/lib/features/albums/albumApiSlice";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";

export default function Page({params}: { params: { slug: string } }) {
  const {
    data: myAlbum,
    isLoading: myAlbumLoading,
    isFetching: myAlbumFetching,
  } = useRetrieveMyAlbumQuery({slug: params.slug})

  const isLoading = (myAlbumLoading || myAlbumFetching)

  const router = useRouter();

  return (
    <>
      <Breadcrumb className=''>
        <BreadcrumbList className='text-l'>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <h1 onClick={() => router.back()}>Albums</h1>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Album</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-6">
        <Separator className="mt-5 mb-3"/>
        <div>
          <h3 className="text-lg font-medium">Edit Album</h3>
        </div>
        <Separator/>
        {isLoading ? <FullScreenSpinner/> : (
          <AlbumEditForm album={myAlbum}/>
        )}
      </div>
    </>
  )
}