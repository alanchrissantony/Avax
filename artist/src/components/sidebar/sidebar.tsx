"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import HomeIcon from "@/components/svg/home";
import RecentIcon from "@/components/svg/recent";
import ArtistsIcon from "@/components/svg/artists";
import AlbumsIcon from "@/components/svg/albums";
import SongsIcon from "@/components/svg/songs";
import UserIcon from "@/components/svg/user";
import { MenuHorizontalIcon } from "@/components/svg/menu";
import { DownArrowIcon, UpArrowIcon } from "@/components/svg/arrows";
import AppIcon from "@/components/svg/app";
import AddIcon from "@/components/svg/add";
import Link from "next/link";
import { useState } from "react";
import { SearchSimpleIcon } from "@/components/svg/search";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (route: string) => pathname === route;

  const menuItems = [
    { name: "Home", icon: HomeIcon, route: "/" },
    { name: "Recently Added", icon: RecentIcon, route: "/recently" },
    { name: "Artists", icon: ArtistsIcon, route: "/artists" },
    { name: "Albums", icon: AlbumsIcon, route: "/albums" },
    { name: "Songs", icon: SongsIcon, route: "/songs" },
    { name: "Made for you", icon: UserIcon, route: "/madeforyou" },
  ];

  const [isVisible, setIsVisible] = useState(true);
  const togglePlaylist = () => setIsVisible(!isVisible);

  return (
    <div className="w-full hidden md:inline bg-[var(--primary-color)] shadow-inner rounded-lg h-screen text-[var(--foreground)]">
      {/* Header */}
      <div className="p-5">
        <div className="flex justify-between">
          <div className="hidden lg:inline">
            <h1 className="text-2xl font-bold">Avax</h1>
            <span className="text-sm text-[var(--secondary-font)]">All Music</span>
          </div>
          <div>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--primary-color)]">
              <MenuHorizontalIcon fill="#ffffff" size="24px" />
            </button>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="pb-5">
        <div className="w-10/12 mx-auto">
          {/* Filter Input */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Filter"
              autoFocus
              className="w-full h-8 pl-8 pr-2 bg-[#333] text-white text-sm rounded-lg outline-none border border-[#EB5757]"
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              <SearchSimpleIcon size="16px" fill="#808080" />
            </div>
          </div>
          {/* Menu Items */}
          {menuItems.map(({ name, icon: Icon, route }) => (
            <Link key={name} href={route}>
              <div
                className={`cursor-pointer flex items-center h-12 px-4 my-1 justify-center lg:justify-start ${
                  isActive(route) ? "bg-[var(--primary-color)] rounded-full shadow-md" : ""
                }`}
              >
                <Icon />
                <span className="hidden lg:inline ml-2">{name}</span>
              </div>
            </Link>
          ))}
          {/* Playlist Section */}
          <div className="mt-4">
            <div
              className="flex justify-center lg:justify-between items-center cursor-pointer px-4"
              onClick={togglePlaylist}
            >
              <h3 className="hidden lg:inline text-lg font-bold">Playlist</h3>
              {isVisible ? <UpArrowIcon /> : <DownArrowIcon fill="white" />}
            </div>
            <div
              className={`overflow-y-auto overflow-x-hidden scrollbar-hide transition-all duration-300 ${
                isVisible
                  ? "max-h-[220px] translate-y-0 opacity-100"
                  : "max-h-0 translate-y-[-10px] opacity-0"
              }`}
            >
              <div className="flex items-center h-12 my-2 px-4 justify-center lg:justify-start">
                <AppIcon />
                <span className="hidden lg:inline ml-2">All Playlists</span>
              </div>
              <div className="flex items-center h-12 my-2 px-4 justify-center lg:justify-start">
                <Image
                  src="/img/goodvibes.jpg"
                  width={32}
                  height={32}
                  alt="Good Vibes Only"
                  className="rounded-[25%]"
                />
                <span className="hidden lg:inline ml-2">Good Vibes Only</span>
              </div>
              <div className="flex items-center h-12 my-2 px-4 justify-center lg:justify-start">
                <Image
                  src="/img/tomorrowland.jpg"
                  width={32}
                  height={32}
                  alt="Tomorrowland"
                  className="rounded-[25%]"
                />
                <span className="hidden lg:inline ml-2">Tomorrowland</span>
              </div>
              <div className="flex items-center h-12 my-2 px-4 justify-center lg:justify-start">
                <Image
                  src="/img/edm.jpg"
                  width={32}
                  height={32}
                  alt="Edm Playlist"
                  className="rounded-[25%]"
                />
                <span className="hidden lg:inline ml-2">Edm Playlist</span>
              </div>
              <div className="flex items-center h-12 my-2 px-4 justify-center lg:justify-start">
                <Image
                  src="/img/goodvibes.jpg"
                  width={32}
                  height={32}
                  alt="Good Vibes Only"
                  className="rounded-[25%]"
                />
                <span className="hidden lg:inline ml-2">Good Vibes Only</span>
              </div>
              <div className="flex items-center h-12 my-2 px-4 justify-center lg:justify-start">
                <Image
                  src="/img/tomorrowland.jpg"
                  width={32}
                  height={32}
                  alt="Tomorrowland"
                  className="rounded-[25%]"
                />
                <span className="hidden lg:inline ml-2">Tomorrowland</span>
              </div>
              <div className="flex items-center h-12 my-2 px-4 justify-center lg:justify-start">
                <Image
                  src="/img/edm.jpg"
                  width={32}
                  height={32}
                  alt="Edm Playlist"
                  className="rounded-[25%]"
                />
                <span className="hidden lg:inline ml-2">Edm Playlist</span>
              </div>
              <div className="flex items-center h-12 my-2 px-4 justify-center lg:justify-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-[25%] bg-[var(--primary-color)]">
                  <AddIcon size="24px" fill="#FFFFFF" />
                </div>
                <span className="hidden lg:inline ml-2">Add Playlist</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
