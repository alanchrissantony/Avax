"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import SearchInput from "@/components/ui/SearchInput";
import Link from "next/link";
import {loginUrl, signupUrl} from "@/utils/consts";
import {useAppSelector} from "@/lib/hooks";
import ProfileDropdownMenu from "@/components/general/ProfileDropdownMenu";
import {Skeleton} from "@/components/ui/skeleton";
import {SidebarMobile} from "@/components/general/SiderbarMobile";


export default function Header() {
  const {isAuthenticated, isLoading} = useAppSelector(state => state.auth)
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header
      className="sticky top-0 z-50 flex items-center h-24 sm:h-auto justify-between w-full p-2 pr-5 pl-5 bg-[#0f0f0f] bg-opacity-90 backdrop-blur-md">
      <div className="flex items-center gap-3 w-[32rem]">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="outline"
            className="p-1 size-8 pr-1.5 rounded-full bg-black hover:bg-[#242424] focus:outline-none border-none"
            onClick={() => router.back()}
          >
            <ChevronLeft className="text-2xl text-gray"/>
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="p-1 pl-1.5 size-8 rounded-full bg-black hover:bg-[#242424] focus:outline-none border-none"
            onClick={() => router.forward()}
          >
            <ChevronRight className="text-2xl text-gray"/>
          </Button>
        </div>

        {pathname.includes("/search") && <SearchInput/>}

      </div>

      <div className="flex items-center gap-3 sm:6">

        {isLoading ? <Skeleton className="h-12 w-12 rounded-full"/> :
          isAuthenticated ? (
            <div className="flex items-center justify-between space-x-4 p-2">
              <Link href={`/premium`} className="hidden lg:flex">
                <Button className="text-black bg-white h-8 rounded-full font-semibold"
                        size="default">
                  Explore Premium
                </Button>
              </Link>
              <ProfileDropdownMenu/>
            </div>
          ) : (
            <div className="hidden sm:flex items-center justify-between space-x-2">
              <Link href={signupUrl}>
                <Button variant="ghost" className="hidden md:block rounded-full font-semibold"
                        size="lg">
                  Sign up
                </Button>
              </Link>
              <Link href={loginUrl}>
                <Button className="text-black bg-white rounded-full font-semibold"
                        size="lg">
                  Log in
                </Button>
              </Link>
            </div>
          )}
        <div className="sm:hidden">
          <SidebarMobile isLoading={isLoading} isAuthenticated={isAuthenticated}/>
        </div>
      </div>
    </header>
  );
}
