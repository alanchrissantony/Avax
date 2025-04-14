"use client";

import {useListAlbumQuery} from "@/lib/features/other/publicApiSlice";
import Footer from "@/components/general/Footer";
import AlbumCards from "@/components/albums/AlbumCards";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


export default function Page() {
  const {
    data: albums,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListAlbumQuery({})

  const load = isLoading || isFetching


  return (
    <MainSection>
      <div className="mx-6 my-6 space-y-6">
        {load ? <FullScreenSpinner/> : (
          (albums?.count || 0) > 0 && (
            <div className="mt-20">
              <TitleShowAll title="Popular Albums" className="text-3xl">
                <AlbumCards albums={albums?.results}/>
              </TitleShowAll>
            </div>
          )
        )}
        <Footer/>
      </div>
    </MainSection>
  );
}
