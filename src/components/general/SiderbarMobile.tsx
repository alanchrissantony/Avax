import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SidebarLinksList from "@/components/general/SidebarLinksList";
import UserLibrary from "@/components/users/UserLibrary";
import { Skeleton } from "@/components/ui/skeleton";
import { loginUrl, signupUrl } from "@/utils/consts";


export function SidebarMobile({ isLoading, isAuthenticated }: { isLoading: boolean, isAuthenticated: boolean }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="hover:scale-105 duration-150">
          <AlignRight className="text-white/60 w-8 h-8" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black backdrop-blur-lg p-2 border-none shadow-2xl rounded-r-2xl">


        <aside className="flex flex-col h-full text-m">
          <div className="flex flex-col items-center p-4 rounded-lg bg-[#131313] my-1 mb-2 pb-2">
            <Link href="/" className="items-stretch w-full ml-4 mt-1">
              <h1 className="text-2xl font-bold">Avax</h1>
              <p className="text-sm">All Music</p>
            </Link>
            <SidebarLinksList />
          </div>

          <div className="p-2 rounded-lg bg-[#131313] my-1 mb-1 mt-0 h-full overflow-y-auto">
            <UserLibrary />
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  )
}