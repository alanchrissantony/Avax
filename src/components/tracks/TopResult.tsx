import CardItemGrid from "@/components/general/CardItemGrid";
import CardItem from "@/components/general/CardItem";
import {Track} from "@/types/types";
import Image from "next/image";
import {Dot, Music} from "lucide-react";
import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import Link from "next/link";
import {useAppSelector} from "@/lib/hooks";


interface Props {
  track: Track | undefined;
  type: string;
}

export default function TopResult({track, type}: Props) {
  const {activeTrack} = useAppSelector((state) => state.track);

  return (
    <Link href={`/tracks/${track?.slug}`}>
      <div
        className={`h-full max-w-md lg:max-w-full p-5 transition relative duration-300 rounded-md cursor-pointer group/item bg-[#202020]/40 shadow-2xl hover:bg-[#353535]/50`}>
        <div className="mb-4">
          {track?.album?.image ? (
            <Image
              src={track.album.image}
              alt={track?.title}
              height={200}
              width={200}
              className={`aspect-square object-cover shadow-2xl rounded-md h-20 w-20`}
            />
          ) : (
            <div className="w-full h-40">
              <Music className="w-full h-full bg-paper "/>
            </div>
          )}
        </div>

        <h3 className="mt-2 font-bold text-2xl truncate w-3/4">{track?.title}</h3>
        <div className="flex text-xs">
          <h6 className="mt-1 font-medium text-white/70">
            {type}
          </h6>
          <Dot/>
          <Link
            href={`/artists/${track?.artist?.slug}`}
            className="mt-0.5 font-semibold text-sm truncate hover:underline text-white/90">
            {track?.artist?.display_name}
          </Link>
        </div>

        {track &&
          <PlayTrackButton
            track={track}
            variant="filled"
            className={`absolute w-12 h-12 text-3xl shadow-2xl bottom-4 right-4 
            ${activeTrack?.slug === track?.slug ? "slide-down" : "slide-up"} group-hover/item:slide-down`}
          />
        }
      </div>
    </Link>
  );
}
