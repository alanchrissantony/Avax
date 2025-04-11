"use client";

import {useListPlaylistQuery} from "@/lib/features/other/publicApiSlice";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import {useSearchParams} from "next/navigation";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import TitleShowAll from "@/components/ui/title-show-all";


export default function Page() {
  const search = useSearchParams();
  const userId = search.get("id");
  const display_name = search.get("name");

  const {
    data: artistPlaylists,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListPlaylistQuery({userId})

  const load = isLoading || isFetching


  return (
    <div
      className="h-full rounded-lg"
      style={{
        backgroundImage: `linear-gradient(to bottom, #202020, #131313, #131313)`,
      }}
    >
      <Header/>
      <div className="mx-6 my-6 space-y-6">

        {(artistPlaylists?.count || 0) > 0 && (
          <div className="mt-20">
            <TitleShowAll title={`Popular Playlists by ${display_name}`} isShowAll={false} className="text-3xl">
              <PlaylistCards playlists={artistPlaylists?.results}/>
            </TitleShowAll>
          </div>
        )}

        <Footer/>
      </div>
    </div>
  );
}
