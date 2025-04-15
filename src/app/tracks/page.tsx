"use client";

import {useListTrackQuery} from "@/lib/features/other/publicApiSlice";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import TrackCards from "@/components/tracks/TrackCards";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import ContentSection from "@/components/general/content-section";


export default function Page() {
  const {
    data: tracks,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListTrackQuery({})

  const load = isLoading || isFetching

  return (
    <MainSection>
      <ContentSection>
        {load ? <FullScreenSpinner/> : (
          (tracks?.count || 0) > 0 && (
            <div className="mt-20">
              <TitleShowAll
                title="Top tracks"
                isShowAll={false}
                className="text-3xl"
              >
                <TrackCards tracks={tracks?.results}/>
              </TitleShowAll>
            </div>
          )
        )}
      </ContentSection>
    </MainSection>
  );
}
