"use client";

import {useListTrackQuery} from "@/lib/features/other/publicApiSlice";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import {usePathname} from "next/navigation";
import TitleShowAll from "@/components/ui/title-show-all";
import TracksTable from "@/components/tracks/TracksTable";


export default function Page() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const artistSlug = parts[2];

  const {
    data: artistTracks,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListTrackQuery({artistSlug})

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

        {(artistTracks?.count || 0) > 0 && (
          <div className="mt-20">
            <TitleShowAll
              title={`Popular releases by ${artistTracks?.results?.[0]?.artist?.display_name}`}
              isShowAll={false}
              className="text-3xl"
            >
              <TracksTable
                tracks={artistTracks?.results}
                showArtistCardHeader
                showCover
                showPlaysCount
              />
            </TitleShowAll>
          </div>
        )}

        <Footer/>
      </div>
    </div>
  );
}
