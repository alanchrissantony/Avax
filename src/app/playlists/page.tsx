"use client";

import {useListPlaylistQuery} from "@/lib/features/other/publicApiSlice";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import ContentSection from "@/components/general/content-section";
import PlaylistCards from "@/components/playlists/PlaylistCards";


export default function Page() {
  const {
    data: playlists,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListPlaylistQuery({})

  const load = isLoading || isFetching


  return (
    <MainSection>
      <ContentSection>
        <div className="mt-20">
          <TitleShowAll title="Popular Playlists" className="text-3xl">
            <PlaylistCards playlists={playlists?.results} isLoading={load}/>
          </TitleShowAll>
        </div>
      </ContentSection>
    </MainSection>
  );
}
