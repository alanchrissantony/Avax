"use client";

import {useListRecentlyListenTracksQuery} from "@/lib/features/other/publicApiSlice";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import {usePathname} from "next/navigation";
import TracksTable from "@/components/tracks/TracksTable";


export default function Page() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const userId = parts[2];

  const {
    data: recentlyTracks,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListRecentlyListenTracksQuery({userId})

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
        {(recentlyTracks?.count || 0) > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between w-full mb-3">
              <h2 className="mt-3 text-3xl font-bold ml-2">
                Top tracks this month
              </h2>
            </div>
            <TracksTable
              tracks={recentlyTracks?.results}
              showCover
              showSubtitle
              showAlbum
            />
          </div>
        )}

        <Footer/>
      </div>
    </div>
  );
}
