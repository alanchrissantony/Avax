"use client";

import {useListTrackQuery} from "@/lib/features/other/publicApiSlice";
import Footer from "@/components/general/Footer";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import TrackCards from "@/components/tracks/TrackCards";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


export default function Page() {
  const {
    data: tracks,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListTrackQuery({})

  const load = isLoading || isFetching

  return (
    <MainSection>
      <div className="mx-6 my-6 space-y-6">
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

        <Footer/>
      </div>
    </MainSection>
  );
}
