"use client";

import { ChevronLeft, ChevronRight, LogOut, User2 } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";
// import CollectionTabs from "./CollectionTabs";
// import SearchInput from "./SearchInput";

export default function Header() {

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full p-2 pr-5 pl-5 bg-[#0f0f0f] bg-opacity-90 backdrop-blur-md">
      <div className="flex items-center gap-10 w-[32rem]">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center p-1 pr-1.5 rounded-full bg-black hover:bg-[#242424] focus:outline-none"
            // onClick={() => router.back()}
          >
            <ChevronLeft className="text-2xl text-gray" />
          </button>

          <button
            className="flex items-center p-1 pl-1.5 rounded-full bg-black hover:bg-[#242424] focus:outline-none"
            // onClick={() => router.forward()}
          >
            <ChevronRight className="text-2xl text-gray" />
          </button>
        </div>

        {/*{pathname.includes("/search") && <SearchInput />}*/}

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

        <div className="space-x-2">
        <Button variant="ghost" className="rounded-full font-semibold"
        size="lg">
          Sign up
        </Button>
        <Button className="text-black bg-white rounded-full font-semibold"
        size="lg">
          Log in
        </Button>
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
