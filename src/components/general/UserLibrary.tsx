"use client";

import {Globe, Layers, Plus} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LibraryItemCard from "./LibraryItemCard";
import LibraryTypeTag from "./LibraryTypeTag";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";


export default function UserLibrary() {

  return (
    <div className="flex flex-col items-stretch flex-1 max-h-full px-2 mt-0 rounded-lg">
      <div className="flex items-center justify-between">

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={"/"}
                className="flex gap-3 px-2 text-gray-300 hover:text-white">
                <Layers size={25}/>
                <span className="font-semibold text-s">Your Library</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-[#161616]">
              <p>Collapse Your Library</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Link
                href={"/"}
                className="gap-3 px-2 w-full text-gray-300 hover:text-white">
                <Plus size={22}/>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-[#161616]">
              <p>Collapse Your Library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="items-center bg-[#282828] rounded-lg p-4 space-y-2">
        <p className="text-m font-semibold">Create your first playlist</p>
        <p className="text-sm">It`s easy, we`ll help you</p>
        <Link
          href={"/login"}
        >
          <Button
            className="mt-4 bg-white hover:bg-gray-300 text-black rounded-3xl"
          >
            Create playlist
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 p-4 pt-10 text-xs text-muted-foreground">
        <a href="#" className="block">
          Legal
        </a>
        <a href="#" className="block">
          Safety & Privacy Center
        </a>
        <a href="#" className="block">
          Privacy Policy
        </a>
        <a href="#" className="block">
          Cookies
        </a>
        <a href="#" className="block">
          About Ads
        </a>
        <a href="#" className="block">
          Accessibility
        </a>
      </div>

      <div className="p-4">
        <Button
          variant="outline"
          className="rounded-3xl"
        >
          <Globe size={20}/>
          <span className="pl-2">English</span>
        </Button>
      </div>


      <div className="flex flex-wrap items-center gap-2 my-6 text-xs font-semibold">
        {/*<LibraryTypeTag*/}
        {/*  active={libraryType === "playlists"}*/}
        {/*  onClick={() => handleLibraryType("playlists")}*/}
        {/*>*/}
        {/*  Playlists*/}
        {/*</LibraryTypeTag>*/}
        {/*<LibraryTypeTag*/}
        {/*  active={libraryType === "albums"}*/}
        {/*  onClick={() => handleLibraryType("albums")}*/}
        {/*>*/}
        {/*  Albums*/}
        {/*</LibraryTypeTag>*/}
        {/*<LibraryTypeTag*/}
        {/*  active={libraryType === "artists"}*/}
        {/*  onClick={() => handleLibraryType("artists")}*/}
        {/*>*/}
        {/*  Artists*/}
        {/*</LibraryTypeTag>*/}
      </div>

      <ul className="flex flex-col w-full pr-3 overflow-y-auto text-sm">
        {/*{libraryType === "playlists" && (*/}
        {/*  <>*/}
        {/*    <Link*/}
        {/*      href="/collection/tracks"*/}
        {/*      className={`${*/}
        {/*        pathname === "/collection/tracks" ? "bg-paper-400" : ""*/}
        {/*      } flex items-center p-2 gap-3 rounded-md text-white cursor-pointer hover:bg-paper-600`}*/}
        {/*    >*/}
        {/*      <Image*/}
        {/*        src="/images/liked_cover.jpeg"*/}
        {/*        height={50}*/}
        {/*        width={50}*/}
        {/*        className="rounded-md"*/}
        {/*        alt="Liked playlist cover"*/}
        {/*      />*/}

        {/*      <div className="truncate">*/}
        {/*        <h6 className="w-full text-sm font-semibold truncate hover:text-white">*/}
        {/*          Liked Songs*/}
        {/*        </h6>*/}
        {/*        <span className="mt-1 text-xs font-medium text-gray">*/}
        {/*          {likedSongsCount} songs*/}
        {/*        </span>*/}
        {/*      </div>*/}
        {/*    </Link>*/}
        {/*    {playlists.map((playlist) => (*/}
        {/*      <LibraryItemCard*/}
        {/*        key={playlist.id}*/}
        {/*        entity={playlist}*/}
        {/*        type="playlists"*/}
        {/*        subtitle={playlist.owner.display_name}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </>*/}
        {/*)}*/}

        {/*{libraryType === "albums" &&*/}
        {/*  albums.map((album) => (*/}
        {/*    <LibraryItemCard*/}
        {/*      key={album.id}*/}
        {/*      entity={album}*/}
        {/*      type="albums"*/}
        {/*      subtitle={album.artists[0].name}*/}
        {/*    />*/}
        {/*  ))}*/}

        {/*{libraryType === "artists" &&*/}
        {/*  artists.map((artist) => (*/}
        {/*    <LibraryItemCard key={artist.id} entity={artist} type="artists" />*/}
        {/*  ))}*/}
      </ul>
    </div>
  );
}
