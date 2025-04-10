"use client";

import {Dot, Music} from "lucide-react";
import Image from "next/image";
import {useListPlaylistQuery, useRetrieveUserQuery} from "@/lib/features/other/publicApiSlice";
import {useAppSelector} from "@/lib/hooks";
import Header from "@/components/general/Header";
import PreviewPlayer from "@/components/tracks/PreviewPlayer";
import FooterLogin from "@/components/general/FooterLogin";
import Footer from "@/components/general/Footer";
import Link from "next/link";
import PlaylistCards from "@/components/playlists/PlaylistCards";

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

  const load = isLoading || isFetching || isLoadingP || isFetchingP

  const {activeTrack, currentIndex} = useAppSelector(state => state.track)

  const UserBgColor = user?.color || "#202020";

  return (
    <>
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
                  <h5 className="text-xs font-bold text-white/80">Profile</h5>
                  <h2 className="text-7xl font-bold">{user.display_name}</h2>

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

        <div className="mx-6 my-6">

          {(userPlaylists?.count || 0) > 0 && (
            <div>
              <div className="flex items-center justify-between w-full mb-3">
                <Link href={`/users/${user?.id}/playlists`} className="mt-3 hover:underline text-2xl font-bold ml-4">
                  Public Playlists
                </Link>
                <Link href={`/users/${user?.id}/playlists`}
                      className="text-sm mt-4 text-white/60 font-normal hover:underline">
                  Show all
                </Link>
              </div>
              <PlaylistCards playlists={userPlaylists?.results.slice(0, 5)}/>
            </div>
          )}

          {/*<div>*/}
          {/*  <TracksTable*/}
          {/*    tracks={album?.tracks}*/}
          {/*    showHeader*/}
          {/*    showSubtitle*/}
          {/*  />*/}
          {/*</div>*/}

          {/*{album?.release_date && (*/}
          {/*  <div>*/}
          {/*    <p className="font-normal text-sm mt-10 text-white/60">*/}
          {/*      {format(new Date(album.release_date), 'MMMM dd, yyyy')}*/}
          {/*    </p>*/}
          {/*    <div className="font-normal text-xs text-white/50">*/}
          {/*      <p>© {format(new Date(album.release_date), 'yyyy')} {album?.artist?.display_name}</p>*/}
          {/*      <p>℗ {format(new Date(album.release_date), 'yyyy')} {album?.artist?.display_name}</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}

          {/*{(artistAlbums?.count || 0) > 0 &&*/}
          {/*  <div className="my-8 mt-16">*/}
          {/*    <div className="flex items-center justify-between w-full mb-2">*/}
          {/*      <Link href={`/albums`} className="mt-3 hover:underline font-bold text-2xl">*/}
          {/*        More by {album?.artist.display_name}*/}
          {/*      </Link>*/}
          {/*      <Link href={`/albums`} className="text-sm mt-4 font-bold text-white/50 hover:underline">*/}
          {/*        See discography*/}
          {/*      </Link>*/}
          {/*    </div>*/}
          {/*    <AlbumCards albums={artistAlbums?.results.slice(0, 5)}/>*/}
          {/*  </div>*/}
          {/*}*/}

          <Footer/>
        </div>
      </div>
      {activeTrack ? <PreviewPlayer/> : <FooterLogin/>}
    </>
  );
}
