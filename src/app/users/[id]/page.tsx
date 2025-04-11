"use client";

import {Dot, Music} from "lucide-react";
import Image from "next/image";
import {
  useListPlaylistQuery, useListRecentlyListenTracksQuery,
  useListUserFollowersQuery, useListUserFollowingQuery,
  useRetrieveUserQuery
} from "@/lib/features/other/publicApiSlice";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import Link from "next/link";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import TracksTable from "@/components/tracks/TracksTable";
import UserCards from "@/components/users/UserCards";
import {Button} from "@/components/ui/button";
import TitleShowAll from "@/components/ui/title-show-all";

interface Props {
  params: {
    id: number;
  };
}

export default function UserPage({params}: Props) {
  const {data: user, isLoading, isFetching} = useRetrieveUserQuery(params.id)
  const {
    data: userPlaylists,
    isLoading: isLoadingP,
    isFetching: isFetchingP,
  } = useListPlaylistQuery({userId: user?.id || 0})
  const {
    data: recentlyTracks,
    isLoading: isLoadingReTracks,
    isFetching: isFetchingReTracks,
  } = useListRecentlyListenTracksQuery({userId: user?.id || 0})
  const {
    data: userFollowing,
    isLoading: isLoadingFollowing,
    isFetching: isFetchingFollowing,
  } = useListUserFollowingQuery({userId: user?.id || 0})
  const {
    data: userFollowers,
    isLoading: isLoadingFollowers,
    isFetching: isFetchingFollowers,
  } = useListUserFollowersQuery({userId: user?.id || 0})

  const load = (
    isLoading || isFetching || isLoadingP || isFetchingP ||
    isLoadingReTracks || isFetchingReTracks || isLoadingFollowers || isFetchingFollowers ||
    isLoadingFollowing || isFetchingFollowing
  )

  const UserBgColor = user?.color || "#202020";

  return (
    <div
      className="h-full rounded-lg"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${UserBgColor}, #131313, #131313)`,
      }}
    >
      <Header/>
      <div className="h-60 bg-opacity-30 bg-black">
        <div className="flex items-end gap-6 p-4 pt-10">
          {user && (
            <>
              {user.image.length > 0 ? (
                <Image
                  src={user.image}
                  alt={user.display_name}
                  height={170}
                  width={170}
                  className="aspect-square object-cover shadow-2xl rounded-full h-44 w-44"
                  priority
                />
              ) : (
                <div>
                  <Music size={160}/>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <h5 className="text-xs font-semibold text-white/80">Profile</h5>
                <h2 className="text-8xl font-black drop-shadow-sm">{user.display_name}</h2>

                <div className="flex items-center text-sm font-medium">
                  {user.playlists_count >= 0 && (
                    <>
                        <span>
                          {user.playlists_count} Public {user.playlists_count === 1 ? "Playlist" : "Playlists"}
                        </span>
                    </>
                  )}
                  {user.followers_count >= 0 && (
                    <>
                      <Dot/>
                      <Link href={`/users/${user.id}/followers`} className="hover:underline">
                        {user.followers_count.toLocaleString()} {user.followers_count === 1 ? "Follower" : "Followers"}
                      </Link>
                    </>
                  )}
                  {user.following_count >= 0 && (
                    <>
                      <Dot/>
                      <Link href={`/users/${user.id}/following`} className="hover:underline">
                        {user.following_count.toLocaleString()} Following
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mx-6 my-6 space-y-8">
        <div className="flex items-center py-1 ml-3">
          <Button variant="ghost"
                  className="rounded-full border border-white/30 h-8 w-19 hover:bg-inherit hover:border-white font-semibold hover:scale-105 duration-150">
            Following
          </Button>
        </div>

        {(recentlyTracks?.count || 0) > 0 && (
          <TitleShowAll
            title="Top tracks this month"
            titlePB="Only visible to you"
            href={`/users/${user?.id}/top/tracks`}
            isShowAll={(recentlyTracks?.count || 0) > 4}
          >
            <TracksTable
              tracks={recentlyTracks?.results.slice(0, 4)}
              showCover
              showSubtitle
              showAlbum
            />
          </TitleShowAll>
        )}

        {(userPlaylists?.count || 0) > 0 && (
          <TitleShowAll
            title="Public Playlists"
            href={`/users/${user?.id}/playlists`}
            isShowAll={(userPlaylists?.count || 0) > 5}
          >
            <PlaylistCards playlists={userPlaylists?.results.slice(0, 5)}/>
          </TitleShowAll>
        )}

        {(userFollowers?.length || 0) > 0 && (
          <TitleShowAll
            title="Followers"
            href={`/users/${user?.id}/followers`}
            isShowAll={(userFollowers?.length || 0) > 5}
          >
            <UserCards users={userFollowers?.slice(0, 5)}/>
          </TitleShowAll>
        )}

        {(userFollowers?.length || 0) > 0 && (
          <TitleShowAll
            title="Following"
            href={`/users/${user?.id}/following`}
            isShowAll={(userFollowing?.length || 0) > 5}
          >
            <UserCards users={userFollowing?.slice(0, 5)}/>
          </TitleShowAll>
        )}

        <Footer/>
      </div>
    </div>
  );
}
