"use client";

import {House, ListMusic, Music, Music2, Search, Users, UserSearch} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import SearchInput from "../ui/SearchInput";

export default function SidebarLinksList() {
  const pathname = usePathname();

  const activeLink = "text-white bg-[#242424]";
  const inactiveLink = "bg-transparent text-gray-300 hover:bg-[#202020] hover:bg-opacity-50";
  const linkStyle =
    "flex items-center gap-4 px-2 py-3 rounded-xl cursor-pointer  hover:text-white";

  return (
    <ul className="flex flex-col items-stretch w-full mt-2">
      <div className="my-2">
        <SearchInput/>
      </div> 
      <Link href="/">
        <li
          className={`${linkStyle} ${
            pathname === "/" ? activeLink : inactiveLink
          }`}
        >
          <House size={20} strokeWidth={pathname === "/" ? 3 : 2}/>
          <span className="font-semibold">Home</span>
        </li>
      </Link>

      <Link href={`/artists`}>
        <li
          className={`${linkStyle} ${
            pathname === "/artists" ? activeLink : inactiveLink
          }`}
        >
          <UserSearch size={20} strokeWidth={pathname === "/artists" ? 3 : 2}/>
          <span className="font-semibold">Artists</span>
        </li>
      </Link>

      <Link href={`/albums`}>
        <li
          className={`${linkStyle} ${
            pathname === "/albums" ? activeLink : inactiveLink
          }`}
        >
          <ListMusic size={20} strokeWidth={pathname === "/albums" ? 3 : 2}/>
          <span className="font-semibold">Albums</span>
        </li>
      </Link>

      <Link href={`/tracks`}>
        <li
          className={`${linkStyle} ${
            pathname === "/tracks" ? activeLink : inactiveLink
          }`}
        >
          <Music2 size={20} strokeWidth={pathname === "/tracks" ? 3 : 2}/>
          <span className="font-semibold">Tracks</span>
        </li>
      </Link>

    </ul>
  );
}
