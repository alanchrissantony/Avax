import { Track } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { Album } from "lucide-react";
import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import { useAppSelector } from "@/lib/hooks";
import { collectionTracks } from "@/utils/consts";
import SkeletonTrack from "@/components/ui/SkeletonTrack";


interface Props {
  tracks: Track[] | undefined;
  tracksCollection?: Track[] | undefined;
  isLoading: boolean;
}

export default function TrackCardsLittle({ tracks, tracksCollection, isLoading }: Props) {
  const { activeTrack } = useAppSelector(state => state.track);

  if (isLoading) return <SkeletonTrack />

  return (
    <div className="grid w-full grid-cols-12 gap-4 p-4">
      {tracksCollection && (
        <Link
          href={collectionTracks}
          className={`flex items-center justify-between col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2 2xl:col-span-1 truncate rounded-sm shadow-lg group/item  duration-300`}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src="/images/liked_cover.png"
                alt="Liked playlist cover"
                width={180}
                height={180}
                className="object-cover h-full rounded-md aspect-square"
              />

              <h4 className="absolute bottom-2 left-2 text-white text-sm font-semibold line-clamp-2 w-36">
                Liked songs
              </h4>

              {tracksCollection?.length > 0 && (
                <PlayTrackButton
                  track={tracksCollection?.[0]}
                  tracks={tracksCollection}
                  variant="filled"
                  className={`${tracksCollection?.[0]?.slug === activeTrack?.slug ? "visible" : "invisible"} absolute bottom-2 right-2 w-10 h-10 shadow-md text-2xl group/btn group-hover/item:visible cursor-pointer`}
                />
              )}
            </div>
          </div>
        </Link>

      )}

      {tracks?.map((track, index) => (
        <Link
          href={`/tracks/${track.slug}`}
          key={track.id}
          className={`flex items-center justify-between col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2 2xl:col-span-1 truncate rounded-sm shadow-lg group/item duration-300 bg-opacity-30`}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              {track.image.length > 0 ? (
                <Image
                  src={track.image}
                  alt={track.title}
                  width={180}
                  height={180}
                  className="object-cover h-full rounded-md aspect-square"
                />
              ) : (
                <Album size={20} />
              )}
              <h4
                className="absolute bottom-2 left-2 text-white text-sm font-semibold line-clamp-2 w-36">{`${track.title}`}</h4>

              <PlayTrackButton
                track={track}
                tracks={tracks}
                index={index}
                variant="filled"
                className={`${activeTrack?.slug === track.slug ? "visible" : "invisible"} absolute bottom-2 right-2 w-10 h-10 shadow-md text-3xl group/btn group-hover/item:visible`}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
