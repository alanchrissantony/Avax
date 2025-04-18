"use client";

import {useListAlbumQuery} from "@/lib/features/other/publicApiSlice";
import AlbumCards from "@/components/albums/AlbumCards";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import ContentSection from "@/components/general/content-section";


export default function Page() {
  const {
    data: albums,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListAlbumQuery({})

  const load = isLoading || isFetching


  return (
    <MainSection>
      <ContentSection>
        <div className="mt-20">
          <TitleShowAll title="Popular Albums" className="text-3xl">
            <AlbumCards albums={albums?.results} isLoading={load}/>
          </TitleShowAll>
        </div>
      </ContentSection>
    </MainSection>
  );
}
