"use client";

import {useListArtistQuery} from "@/lib/features/other/publicApiSlice";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import ArtistCards from "@/components/artists/ArtistCards";
import TitleShowAll from "@/components/ui/title-show-all";


export default function Page() {
  const {
    data: artists,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListArtistQuery({})

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

        {(artists?.count || 0) > 0 && (
          <div className="mt-20">
            <TitleShowAll title="Popular Artists" isShowAll={false} className="text-3xl">
              <ArtistCards artists={artists?.results}/>
            </TitleShowAll>
          </div>
        )}

        <Footer/>
      </div>
    </div>
  );
}
