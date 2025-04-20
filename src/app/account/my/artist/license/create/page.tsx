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
import {LicenseCreateForm} from "@/components/forms/license-create-form";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList className='text-l'>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <h1 onClick={() => router.replace(`/account/my/artist/license`)}>License</h1>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Create License</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-6">
        <Separator className="mt-5 mb-3"/>
        <div>
          <h3 className="text-lg font-medium">Create License</h3>
        </div>
        <Separator/>
        <LicenseCreateForm/>
      </div>
    </>
  )
}