"use client";

import {useListPlaylistQuery} from "@/lib/features/other/publicApiSlice";
import {usePathname} from "next/navigation";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import ContentSection from "@/components/general/content-section";


export default function UserPlaylistsPage() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const genreSlug = parts[2];

  const {
    data: genrePlaylists,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListPlaylistQuery({genreSlug})

  const load = isLoading || isFetching

  return (
    <MainSection>
      <ContentSection>
        <div className="mt-20">
          <TitleShowAll
            title={`Popular ${genrePlaylists?.results?.[0].genre.name} playlists`}
            isShowAll={false}
            className="text-3xl"
          >
            <PlaylistCards playlists={genrePlaylists?.results} isLoading={load}/>
          </TitleShowAll>
        </div>
      </ContentSection>
    </MainSection>
  );
}
