"use client";

import {useListPlaylistQuery} from "@/lib/features/other/publicApiSlice";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import {usePathname} from "next/navigation";
import PlaylistCards from "@/components/playlists/PlaylistCards";


export default function UserPlaylistsPage() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const userId = parts[2];

  const {
    data: userPlaylists,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListPlaylistQuery({userId})

  const load = isLoading || isFetching

  return (
    <div
      className="h-full rounded-lg"
      style={{
        backgroundImage: `linear-gradient(to bottom, #202020, #131313, #131313)`,
      }}
    >
      <Header/>
      <div className="mx-6 my-6 space-y-6">
        {(userPlaylists?.count || 0) > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between w-full mb-3">
              <h2 className="mt-3 text-3xl font-bold ml-2">
                Public Playlists
              </h2>
            </div>
            <PlaylistCards playlists={userPlaylists?.results}/>
          </div>
        )}

        <Footer/>
      </div>
    </div>
  );
}
