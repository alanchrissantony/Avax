"use client";

import {useListPlaylistQuery} from "@/lib/features/other/publicApiSlice";
import {useSearchParams} from "next/navigation";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import ContentSection from "@/components/general/content-section";


export default function Page() {
  const search = useSearchParams();
  const userId = search.get("id");
  const display_name = search.get("name");

  const {
    data: artistPlaylists,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListPlaylistQuery({userId}, {skip: !userId})

  const load = isLoading || isFetching


  return (
    <MainSection>
      <ContentSection>

        {load ? <FullScreenSpinner/> : (
          (artistPlaylists?.count || 0) > 0 && (
            <div className="mt-20">
              <TitleShowAll title={`Popular Playlists by ${display_name}`} isShowAll={false} className="text-3xl">
                <PlaylistCards playlists={artistPlaylists?.results}/>
              </TitleShowAll>
            </div>
          )
        )}

      </ContentSection>
    </MainSection>
  );
}
