"use client";

import {useListTrackQuery} from "@/lib/features/other/publicApiSlice";
import {usePathname} from "next/navigation";
import TracksTable from "@/components/tracks/TracksTable";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import ContentSection from "@/components/general/content-section";


export default function Page() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const genreSlug = parts[2];

  const {
    data: genreTracks,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListTrackQuery({genreSlug})

  const load = isLoading || isFetching

  return (
    <MainSection>
      <ContentSection>
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

      </ContentSection>
    </MainSection>
  );
}
