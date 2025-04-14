"use client";

import {Dot, Music} from "lucide-react";
import Image from "next/image";
import {
  useListTrackQuery,
  useRetrievePlaylistQuery
} from "@/lib/features/other/publicApiSlice";
import TracksTable from "@/components/tracks/TracksTable";
import {useAppSelector} from "@/lib/hooks";
import Footer from "@/components/general/Footer";
import Link from "next/link";
import {formatDuration} from "@/utils/clientUtils";
import TitleShowAll from "@/components/ui/title-show-all";
import PlayButtonAndOther from "@/components/ui/play-button-and-other";
import MainSection from "@/components/general/main-section";

interface Props {
  params: {
    slug: string;
  };
}

export default function PlaylistPage({params}: Props) {
  const {data: playlist, isLoading, isFetching} = useRetrievePlaylistQuery(params.slug)
  const {
    data: recommendations,
    isLoading: isLoadingRec,
    isFetching: isFetchingRec,
  } = useListTrackQuery({genreSlug: playlist?.genre?.slug || ''})

  const load = isLoading || isFetching || isLoadingRec || isFetchingRec

  const {activeTrack, currentIndex} = useAppSelector(state => state.track)

  const playlistBgColor = playlist?.color || "#202020";

  return (
    <MainSection bgColor={playlistBgColor}>
      <div className="h-60 bg-opacity-30 bg-black">
        <div className="flex items-end gap-6 p-4 pt-10">
          {playlist && (
            <>
              {playlist.image.length > 0 ? (
                <Image
                  src={playlist.image}
                  alt={playlist.title}
                  height={170}
                  width={170}
                  className="aspect-square object-cover shadow-2xl rounded-sm h-44 w-44"
                  priority
                />
              ) : (
                <div className="">
                  <Music size={160} className=" bg-paper "/>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <h5 className="text-xs font-bold uppercase">{playlist.genre.name}</h5>
                <h2 className="text-6xl font-bold">{playlist.title}</h2>

                {playlist.description && (
                  <p className="font-medium text-sm mt-3 whitespace-pre-line text-white/50">
                    {playlist.description}
                  </p>
                )}

                <div className="flex items-center text-sm font-medium">
                  <Image
                    src={playlist.user.image}
                    alt={playlist.user.display_name}
                    height={24}
                    width={24}
                    className="aspect-square object-cover rounded-full mr-1 h-6 w-6"
                    priority
                  />
                  {playlist.user?.artist_slug ? (
                    <Link href={`/artists/${playlist.user.artist_slug}`}
                          className="font-semibold hover:underline">{playlist.user.display_name}</Link>
                  ) : (
                    <Link href={`/users/${playlist.user.id}`}
                          className="font-semibold hover:underline">{playlist.user.display_name}</Link>
                  )}

                  {playlist.favorite_count > 0 && (
                    <>
                      <Dot/>
                      <span>
                      {playlist.favorite_count.toLocaleString()}{" "}
                        {playlist.favorite_count > 1 ? "saves" : "save"}
                    </span>
                    </>
                  )}
                  {playlist.tracks.length > 0 && (
                    <>
                      <Dot/>
                      <span>{playlist.tracks.length.toLocaleString()} {playlist.tracks.length === 1 ? "song" : "songs"}</span>
                    </>
                  )}
                  {playlist?.duration && (
                    <>
                      <Dot/>
                      <span className="text-white/50">about {formatDuration(playlist.duration)}</span>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mx-6 my-6 space-y-8">

        <PlayButtonAndOther
          track={playlist?.tracks?.[currentIndex] || (activeTrack || undefined)}
          tracks={playlist?.tracks}
          index={currentIndex}
          isFavorite
        />

        <div>
          <TracksTable
            tracks={playlist?.tracks}
            showAlbum
            showCover
            showHeader
            showSubtitle
          />
        </div>

        {(recommendations?.count || 0) > 0 &&
          <TitleShowAll
            title="Recomended"
            titlePB="Based on what`s in this playlist"
            isShowAll={false}
          >
            <TracksTable
              tracks={recommendations?.results.slice(0, 10)}
              showAlbum
              showCover
              showSubtitle
              showHeader
              showIndex={false}
            />
          </TitleShowAll>
        }

        <Footer/>
      </div>
    </MainSection>
  );
}
