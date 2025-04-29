"use client";

import {Dot, Music} from "lucide-react";
import Image from "next/image";
import {
    useListTrackQuery,
    useRetrievePlaylistQuery
} from "@/lib/features/other/publicApiSlice";
import TracksTable from "@/components/tracks/TracksTable";
import {useAppSelector} from "@/lib/hooks";
import Link from "next/link";
import {formatDuration} from "@/utils/clientUtils";
import TitleShowAll from "@/components/ui/title-show-all";
import PlayButtonAndOther from "@/components/ui/play-button-and-other";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import ContentSection from "@/components/general/content-section";
import {useListUserPlaylistLikedQuery} from "@/lib/features/playlists/playlistApiSlice";
import {useEffect} from "react";
import {redirect} from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}

export default function PlaylistPage({params}: Props) {
    const {isAuthenticated, user: currUser} = useAppSelector(state => state.auth)
    const {
        data: playlist,
        isLoading,
        isFetching,
    } = useRetrievePlaylistQuery(params.slug)
    const genreSlug = playlist?.genre?.slug || null
    const {
        data: recommendations,
        isLoading: isLoadingRec,
        isFetching: isFetchingRec,
    } = useListTrackQuery({genreSlug}, {skip: !genreSlug})
    const {
        data: playlistsFav,
        isLoading: isLoadingPlFav,
        isFetching: isFetchingPlFav,
    } = useListUserPlaylistLikedQuery({}, {skip: !isAuthenticated || !params.slug});

    const load = isLoading || isFetching || isLoadingRec || isFetchingRec || isLoadingPlFav || isFetchingPlFav

    const {activeTrack, currentIndex} = useAppSelector(state => state.track)

    const playlistBgColor = playlist?.color || "#202020";

    useEffect(() => {
        if (isAuthenticated && (currUser?.id === playlist?.user?.id)) redirect(`/playlists/my/${playlist?.slug}`);
    }, [currUser?.id, isAuthenticated, playlist?.slug, playlist?.user?.id]);

    return (
        <MainSection bgColor={playlistBgColor}>
            <div className="h-52 md:h-60 bg-gradient-to-t from-black/20 to-black/0">
                <div className="flex items-end gap-6 p-4 pt-20 sm:pt-10">
                    {playlist && (
                        <>
                            {playlist.image.length > 0 ? (
                                <Image
                                    src={playlist.image}
                                    alt={playlist.title}
                                    height={170}
                                    width={170}
                                    className="aspect-square object-cover shadow-2xl rounded-sm h-24 w-24 sm:h-32 sm:w-32 md:h-44 md:w-44"
                                    priority
                                />
                            ) : (
                                <div>
                                    <Music size={160} className=" bg-paper "/>
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                {playlist?.genre && (
                                    <h5 className="text-xs font-bold uppercase">{playlist.genre.name}</h5>
                                )}
                                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">{playlist.title}</h2>

                                {playlist.description && (
                                    <p className="hidden lg:block font-medium text-sm mt-3 whitespace-pre-line text-white/50">
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
                                            <span className="text-white/50">{formatDuration(playlist.duration)}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ContentSection>
                {load ? <FullScreenSpinner/> : (
                    <>
                        <PlayButtonAndOther
                            track={playlist?.tracks?.[currentIndex] || (activeTrack || undefined)}
                            tracks={playlist?.tracks}
                            index={currentIndex}
                            isShowFavorite={true}
                            favoriteType="playlist"
                            isFavorite={playlistsFav?.results?.some((item) => item?.playlist?.slug === playlist?.slug)}
                            slugFav={playlist?.slug}
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
                    </>
                )}

            </ContentSection>
        </MainSection>
    );
}
