"use client";

import {useListRecentlyListenTracksQuery} from "@/lib/features/other/publicApiSlice";
import Footer from "@/components/general/Footer";
import {usePathname} from "next/navigation";
import TracksTable from "@/components/tracks/TracksTable";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


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
    <MainSection>
      <div className="mx-6 my-6 space-y-8">
        {load ? <FullScreenSpinner/> : (
          (recentlyTracks?.count || 0) > 0 && (
            <div className="mt-20">
              <TitleShowAll
                title="Top tracks this month"
                isShowAll={false}
                className="text-3xl"
              >
                <TracksTable
                  tracks={recentlyTracks?.results}
                  showCover
                  showSubtitle
                  showAlbum
                />
              </TitleShowAll>
            </div>
          )
        )}

        <Footer/>
      </div>
    </MainSection>
  );
}
