"use client";

import {ChevronLeft, ChevronRight, LogOut, User2} from "lucide-react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import SearchInput from "@/components/ui/SearchInput";
import Link from "next/link";


export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between w-full p-2 pr-5 pl-5 bg-[#0f0f0f] bg-opacity-90 backdrop-blur-md">
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

        {/*{pathname.includes("/collection") &&*/}
        {/*  pathname !== "/collection/tracks" && <CollectionTabs />}*/}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 py-2 pl-2 pr-4 rounded-full bg-background-secondary bg-opacity-70">
          {/*{session?.user.image ? (*/}
          {/*  <Image*/}
          {/*    src={session?.user.picture as string}*/}
          {/*    className="object-contain w-8 h-8 rounded-full"*/}
          {/*    alt={session?.user?.name}*/}
          {/*    height={32}*/}
          {/*    width={32}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <User2 className="p-1 rounded-full bg-paper-400" />*/}
          {/*)}*/}
          {/*<span className="text-sm font-bold tracking-wide">*/}
          {/*  {session?.user.name}*/}
          {/*</span>*/}
        </div>

        <div className="felx items-center justify-between space-x-2">
          <Link href={`/auth/signup`}>
            <Button variant="ghost" className="rounded-full font-semibold"
                    size="lg">
              Sign up
            </Button>
          </Link>
          <Link href={`/auth/login`}>
            <Button className="text-black bg-white rounded-full font-semibold"
                    size="lg">
              Log in
            </Button>
          </Link>
        </div>

        {/*<button*/}
        {/*  className="flex items-center justify-center bg-background-secondary bg-opacity-70 rounded-full h-10 w-10 hover:bg-[#181818] focus:outline-none cursor-pointer"*/}
        {/*  // onClick={logout}*/}
        {/*>*/}
        {/*  <LogOut />*/}
        {/*</button>*/}
      </div>
    </header>
  );
}
