"use client";

import {useListPlaylistQuery, useListTrackQuery, useRetrieveGenreQuery,} from "@/lib/features/other/publicApiSlice";
import TracksTable from "@/components/tracks/TracksTable";
import Footer from "@/components/general/Footer";
import TitleShowAll from "@/components/ui/title-show-all";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import MainSection from "@/components/general/main-section";

interface Props {
  params: {
    slug: string;
  };
}

export default function Page({params}: Props) {
  const {data: genre, isLoading, isFetching} = useRetrieveGenreQuery(params.slug)
  const {
    data: genrePlaylists,
    isLoading: isLoadingP,
    isFetching: isFetchingP,
  } = useListPlaylistQuery({genreSlug: params.slug})
  const {
    data: genreTracks,
    isLoading: isLoadingT,
    isFetching: isFetchingT,
  } = useListTrackQuery({genreSlug: params.slug})

  const load = isLoading || isFetching || isLoadingP || isFetchingP || isLoadingT || isFetchingT

  const genreBgColor = genre?.color || "#202020";

  return (
    <MainSection bgColor={genreBgColor}>
      <div className="h-52 bg-opacity-20 bg-black flex flex-col justify-end">
        <div className="flex items-end gap-6 p-5 pb-8">
          {genre && (
            <div>
              <h2 className="text-8xl font-bold">{genre.name}</h2>
            </div>
          )}
        </div>
      </div>

      <div className="mx-6 my-6 space-y-8">

        {(genreTracks?.count || 0) > 0 &&
          <TitleShowAll
            title={`Popular ${genre?.name} tracks`}
            href={`/genre/${params.slug}/tracks`}
            isShowAll={(genreTracks?.count || 0) > 5}
          >
            <TracksTable
              tracks={genreTracks?.results.slice(0, 5)}
              showCover
              showPlaysCount
              showSubtitle
            />
          </TitleShowAll>
        }

        {(genrePlaylists?.count || 0) > 0 &&
          <TitleShowAll
            title={`Popular ${genre?.name} playlists`}
            href={`/genre/${params.slug}/playlists`}
            isShowAll={(genrePlaylists?.count || 0) > 5}
          >
            <PlaylistCards playlists={genrePlaylists?.results.slice(0, 5)}/>
          </TitleShowAll>
        }

        {/*<div>*/}
        {/*  <TracksTable*/}
        {/*    tracks={album?.tracks}*/}
        {/*    showHeader*/}
        {/*    showSubtitle*/}
        {/*  />*/}
        {/*</div>*/}

        {/*{album?.release_date && (*/}
        {/*  <div>*/}
        {/*    <p className="font-normal text-sm mt-10 text-white/60">*/}
        {/*      {format(new Date(album.release_date), 'MMMM dd, yyyy')}*/}
        {/*    </p>*/}
        {/*    <div className="font-normal text-xs text-white/50">*/}
        {/*      <p>© {format(new Date(album.release_date), 'yyyy')} {album?.artist?.display_name}</p>*/}
        {/*      <p>℗ {format(new Date(album.release_date), 'yyyy')} {album?.artist?.display_name}</p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}

        <Footer/>
      </div>
    </MainSection>
  );
}
