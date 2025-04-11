"use client";

import {useListAlbumQuery} from "@/lib/features/other/publicApiSlice";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import {usePathname} from "next/navigation";
import AlbumCards from "@/components/albums/AlbumCards";
import TitleShowAll from "@/components/ui/title-show-all";


export default function Page() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const artistSlug = parts[2];

  const {
    data: artistAlbums,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListAlbumQuery({artistSlug})

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

        {(artistAlbums?.count || 0) > 0 && (
          <div className="mt-20">
            <TitleShowAll
              title={`Popular Albums by ${artistAlbums?.results?.[0].artist?.display_name}`}
              isShowAll={false}
              className="text-3xl"
            >
              <AlbumCards albums={artistAlbums?.results}/>
            </TitleShowAll>
          </div>
        )}

        <Footer/>
      </div>
    </div>
  );
}
