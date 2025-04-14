"use client";

import {House, Search} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function SidebarLinksList() {
  const pathname = usePathname();

  const activeLink = "text-white";
  const inactiveLink = "bg-transparent text-gray-300";
  const linkStyle =
    "flex items-center gap-4 px-2 py-3 rounded-md cursor-pointer  hover:text-white";

  return (
    <ul className="flex flex-col items-stretch w-full mt-2">
      <Link href="/">
        <li
          className={`${linkStyle} ${
            pathname === "/" ? activeLink : inactiveLink
          }`}
        >
          <House string={25} strokeWidth={pathname === "/" ? 3 : 2}/>
          <span className="font-semibold">Home</span>
        </li>
      </Link>

      <Link href={`/search`}>
        <li
          className={`${linkStyle} ${
            pathname === "/search" ? activeLink : inactiveLink
          }`}
        >
          <Search size={25} strokeWidth={pathname === "/search" ? 3 : 2}/>
          <span className="font-semibold">Search</span>
        </li>
      </Link>
    </ul>
  );
}
