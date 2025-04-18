"use client";

import {Dot} from "lucide-react";
import Image from "next/image";
import MainSection from "@/components/general/main-section";
import ContentSection from "@/components/general/content-section";
import {useListUserTracksLikedQuery} from "@/lib/features/tracks/trackApiSlice";
import {useAppSelector} from "@/lib/hooks";
import Link from "next/link";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import PlayButtonAndOther from "@/components/ui/play-button-and-other";
import TracksTable from "@/components/tracks/TracksTable";

export default function LikedTracksPage() {
  const {
    data: tracks,
    isLoading,
    isFetching,
  } = useListUserTracksLikedQuery({});

  const {user} = useAppSelector(state => state.auth)
  const {activeTrack, currentIndex} = useAppSelector(state => state.track)

  const load = isLoading || isFetching

  const playlistBgColor = "#5b46c4";

  return (
    <MainSection bgColor={playlistBgColor}>
      <div className="h-60 bg-opacity-30 bg-black">
        <div className="flex items-end gap-6 p-4 pt-10">
          <Image
            src="/images/avax_like.png"
            alt="Liked Songs"
            height={170}
            width={170}
            className="aspect-square object-cover shadow-2xl rounded-sm h-44 w-44"
            priority
          />
          <div className="flex flex-col gap-3">
            <h5 className="text-xs font-bold">Playlist</h5>
            <h2 className="text-4xl font-extrabold xl:font-black md:text-6xl lg:text-7xl xl:text-8xl">Liked Songs</h2>

            <div className="flex items-center text-sm font-medium">
              {user && (
                <>
                  <Image
                    src={user.image}
                    alt={user.display_name}
                    height={24}
                    width={24}
                    className="aspect-square object-cover rounded-full mr-1 h-6 w-6"
                    priority
                  />
                  {user?.artist_slug ? (
                    <Link href={`/artists/${user.artist_slug}`}
                          className="font-semibold hover:underline">{user.display_name}</Link>
                  ) : (
                    <Link href={`/users/${user.id}`}
                          className="font-semibold hover:underline">{user.display_name}</Link>
                  )}

                  {(tracks?.count || 0) > 0 && (
                    <>
                      <Dot/>
                      <span>{tracks?.count.toLocaleString()} {tracks?.count === 1 ? "song" : "songs"}</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <ContentSection>
        {load ? <FullScreenSpinner/> : (
          <>
            <PlayButtonAndOther
              track={tracks?.results?.[currentIndex] || (activeTrack || undefined)}
              tracks={tracks?.results}
              index={currentIndex}
            />

            <div>
              <TracksTable
                tracks={tracks?.results}
                showAlbum
                showCover
                showHeader
                showSubtitle
              />
            </div>
          </>
        )}

      </ContentSection>
    </MainSection>
  );
}
