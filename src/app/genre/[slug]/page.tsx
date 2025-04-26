"use client";

import {useListPlaylistQuery, useListTrackQuery, useRetrieveGenreQuery,} from "@/lib/features/other/publicApiSlice";
import TracksTable from "@/components/tracks/TracksTable";
import TitleShowAll from "@/components/ui/title-show-all";
import PlaylistCards from "@/components/playlists/PlaylistCards";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import ContentSection from "@/components/general/content-section";

interface Props {
  params: {
    slug: string;
  };
}

export default function Page({params}: Props) {
  const {
    data: genre,
    isLoading,
    isFetching,
  } = useRetrieveGenreQuery(params.slug)
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
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold">{genre.name}</h2>
            </div>
          )}
        </div>
      </div>

      <ContentSection>

        {load ? <FullScreenSpinner/> : (
          <>
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
          </>
        )}

      </ContentSection>
    </MainSection>
  );
}
