"use client";

import {Dot, Music} from "lucide-react";
import Image from "next/image";
import {
  useListPlaylistQuery, useListRecentlyListenTracksQuery,
} from "@/lib/features/other/publicApiSlice";
import Link from "next/link";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import TracksTable from "@/components/tracks/TracksTable";
import UserCards from "@/components/users/UserCards";
import TitleShowAll from "@/components/ui/title-show-all";
import PlayButtonAndOther from "@/components/ui/play-button-and-other";
import MainSection from "@/components/general/main-section";
import ContentSection from "@/components/general/content-section";
import {useAppSelector} from "@/lib/hooks";
import {
  useListUserFollowersQuery,
  useListUserFollowingQuery,
  useRetrieveUserQuery
} from "@/lib/features/auth/authApiSlice";
import {useEffect} from "react";
import {redirect} from "next/navigation";
import {profileMyUrl} from "@/utils/consts";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";

interface Props {
  params: {
    id: number;
  };
}

export default function UserPage({params}: Props) {
  const {user: currUser} = useAppSelector(state => state.auth)
  const {data: user, isLoading, isFetching} = useRetrieveUserQuery(params.id)
  const userId = user?.id || null;
  const {
    data: userPlaylists,
    isLoading: isLoadingP,
    isFetching: isFetchingP,
  } = useListPlaylistQuery({userId}, {skip: !userId})
  const {
    data: recentlyTracks,
    isLoading: isLoadingReTracks,
    isFetching: isFetchingReTracks,
  } = useListRecentlyListenTracksQuery({userId}, {skip: !userId})
  const {
    data: userFollowing,
    isLoading: isLoadingFollowing,
    isFetching: isFetchingFollowing,
  } = useListUserFollowingQuery({userId}, {skip: !userId})
  const {
    data: userFollowers,
    isLoading: isLoadingFollowers,
    isFetching: isFetchingFollowers,
  } = useListUserFollowersQuery({userId}, {skip: !userId})

  const load = (
    isLoading || isFetching || isLoadingP || isFetchingP ||
    isLoadingReTracks || isFetchingReTracks || isLoadingFollowers || isFetchingFollowers ||
    isLoadingFollowing || isFetchingFollowing
  )

  const userBgColor = user?.color || "#202020";

  useEffect(() => {
    if (currUser?.id === userId) redirect(profileMyUrl);
  }, [currUser?.id, userId]);

  return (
    <MainSection bgColor={userBgColor} bgGradient="30%">
      <div className="h-52 md:h-60 bg-opacity-30 bg-black">
        <div className="flex items-end gap-6 p-4 pt-10">
          {user && (
            <>
              {user.image.length > 0 ? (
                <Image
                  src={user.image}
                  alt={user.display_name}
                  height={170}
                  width={170}
                  className="aspect-square object-cover shadow-2xl rounded-full h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-44 lg:w-44"
                  priority
                />
              ) : (
                <div>
                  <Music size={160}/>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <h5 className="text-xs font-semibold text-white/80">Profile</h5>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black drop-shadow-sm truncate whitespace-normal">{user.display_name}</h2>

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

      <ContentSection>

        {load ? <FullScreenSpinner/> : (
          <>
            <PlayButtonAndOther
              isPlayButton={false}
              isShowFollow={true}
              isFollowing={userFollowers?.some(follower => follower.id === currUser?.id)}
              userIdFollow={user?.id}
            />

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
          </>
        )}

      </ContentSection>
    </MainSection>
  );
}
