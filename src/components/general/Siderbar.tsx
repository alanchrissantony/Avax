import Image from "next/image";
import SidebarLinksList from "./SidebarLinksList";
import UserLibrary from "@/components/users/UserLibrary";
import Link from "next/link";


export function Sidebar() {
  return (
    <aside className="flex flex-col h-[calc(97vh-4rem)] col-span-2 text-m">
      <div className="flex flex-col items-center p-4 rounded-lg bg-[#131313] m-2 pb-2">
        <Link href="/" className="items-stretch w-full ml-4 mt-1">
          <Image
            src="/images/avax_full_logo_rgb_white.png"
            width={87}
            height={38}
            alt="Avax logo"
            priority
          />
        </Link>
        <SidebarLinksList/>
      </div>

      <div className="p-2 rounded-lg bg-[#131313] m-2 pt-0 mt-0 h-full overflow-y-auto">

        <UserLibrary
          // likedSongsCount={likedSongsCount}
          // playlists={playlists}
          // artists={artists}
          // albums={albums}
        />


      </div>
    </aside>
  )
}