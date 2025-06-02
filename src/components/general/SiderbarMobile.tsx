import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {AlignRight} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SidebarLinksList from "@/components/general/SidebarLinksList";
import UserLibrary from "@/components/users/UserLibrary";
import {Skeleton} from "@/components/ui/skeleton";
import {loginUrl, signupUrl} from "@/utils/consts";


export function SidebarMobile({isLoading, isAuthenticated}: { isLoading: boolean, isAuthenticated: boolean }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="hover:scale-105 duration-150">
          <AlignRight className="text-white/60 w-8 h-8"/>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black backdrop-blur-lg p-2 border-none shadow-2xl rounded-r-2xl">


        <aside className="flex flex-col h-full text-m">
          <div className="flex flex-col items-center p-4 rounded-lg bg-[#131313] my-1 mb-2 pb-2">
            <Link href="/" className="items-stretch w-full ml-4 mt-1">
              <Image
                src="/images/spotify_full_logo_rgb_white.png"
                width={87}
                height={38}
                alt="Spotify logo"
                priority
              />
            </Link>
            <SidebarLinksList/>
          </div>

          <div className="p-2 rounded-lg bg-[#131313] my-1 mb-1 mt-0 h-full overflow-y-auto">
            <UserLibrary/>

            {isLoading ? <Skeleton className="h-12 w-12 rounded-full"/> :
              isAuthenticated ? (
                <div className="flex items-center space-x-4 p-2 pt-10">
                  <Link href={`/premium`}>
                    <Button variant="outline"
                            className="h-8 border-2 border-[#404040] hover:bg-[#252525] hover:scale-105 duration-150 bg-[#202020] rounded-full font-medium"
                            size="default">
                      Explore Premium
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full space-x-2 pt-10">
                  <Link href={signupUrl}>
                    <Button variant="ghost" className="block rounded-full font-semibold"
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
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  )
}