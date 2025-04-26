import {Music} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Track} from "@/types/types";
import PlayButtonAndOther from "@/components/ui/play-button-and-other";
import {useListUserTracksLikedQuery} from "@/lib/features/tracks/trackApiSlice";
import {useAppSelector} from "@/lib/hooks";

interface IProps {
  activeTrack?: Track | null;
}

export default function PlayerTrackInfo({activeTrack}: IProps) {
  const {isAuthenticated} = useAppSelector(state => state.auth)
  const {
    data: tracksFav,
  } = useListUserTracksLikedQuery({}, {skip: !isAuthenticated || !activeTrack});


  return (
    <div className="flex items-center col-span-1 sm:col-span-3 gap-3">
      {activeTrack?.album ? (
        <Image
          src={activeTrack.album.image}
          alt={activeTrack.title}
          height={56}
          width={56}
          className="object-cover w-14 h-14 aspect-square rounded-md hidden sm:block"
        />
      ) : (
        <Music size={56} className="mb-4 hidden sm:block"/>
      )}
      <div className="max-w-full hidden md:block">
        <h4 className="text-sm text-white truncate">
          {activeTrack?.title}
        </h4>
        <Link
          href={`/artist/${activeTrack?.artist.slug}`}
          className="text-xs text-white/60"
        >
          {activeTrack?.artist.display_name}
        </Link>
      </div>
      {activeTrack &&
        <PlayButtonAndOther
          isPlayButton={false}
          track={activeTrack}
          isShowFavorite={true}
          favoriteType="trackPlayer"
          isFavorite={tracksFav?.results?.some((trackFav) => trackFav?.slug === activeTrack?.slug)}
          slugFav={activeTrack?.slug}
        />
      }
    </div>
  );
}
