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
  const genreSlug = parts[2];

  const {
    data: genreTracks,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListRecentlyListenTracksQuery({genreSlug})

  const load = isLoading || isFetching

  return (
    <MainSection>
      <div className="mx-6 my-6 space-y-6">
        {load ? <FullScreenSpinner/> : (
          (genreTracks?.count || 0) > 0 && (
            <div className="mt-20">
              <TitleShowAll
                title={`Popular ${genreTracks?.results?.[0].genre.name} tracks`}
                isShowAll={false}
                className="text-3xl"
              >
                <TracksTable
                  tracks={genreTracks?.results}
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
