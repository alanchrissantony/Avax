"use client";

import {useListArtistQuery} from "@/lib/features/other/publicApiSlice";
import ArtistCards from "@/components/artists/ArtistCards";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import ContentSection from "@/components/general/content-section";


export default function Page() {
  const {
    data: artists,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListArtistQuery({})

  const load = isLoading || isFetching


  return (
    <MainSection>
      <ContentSection>
        <div className="mt-20">
          <TitleShowAll title="Popular Artists" isShowAll={false} className="text-3xl">
            <ArtistCards artists={artists?.results} isLoading={load}/>
          </TitleShowAll>
        </div>
      </ContentSection>
    </MainSection>
  );
}
