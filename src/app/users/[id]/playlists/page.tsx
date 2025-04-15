"use client";

import {useListPlaylistQuery} from "@/lib/features/other/publicApiSlice";
import {usePathname} from "next/navigation";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import ContentSection from "@/components/general/content-section";


export default function UserPlaylistsPage() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const userId = parts[2];

  const {
    data: userPlaylists,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListPlaylistQuery({userId})

  const load = isLoading || isFetching

  return (
    <MainSection>
      <ContentSection>
        {load ? <FullScreenSpinner/> : (
          (userPlaylists?.count || 0) > 0 && (
            <div className="mt-20">
              <TitleShowAll
                title="Public Playlists"
                isShowAll={false}
                className="text-3xl"
              >
                <PlaylistCards playlists={userPlaylists?.results}/>
              </TitleShowAll>
            </div>
          )
        )}
      </ContentSection>
    </MainSection>
  );
}
