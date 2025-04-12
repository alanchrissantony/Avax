import {Track} from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import {Album} from "lucide-react";
import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import {useAppSelector} from "@/lib/hooks";


interface Props {
  tracks: Track[] | undefined;
}

export default function TrackCardsLittle({tracks}: Props) {
  const {activeTrack} = useAppSelector(state => state.track);

  return (
    <div className="grid w-full grid-cols-12 gap-4 p-4">
      {tracks?.map((track, index) => (
        <Link
          href={`/tracks/${track.slug}`}
          key={track.id}
          className={`flex items-center justify-between col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3 pr-4 truncate rounded-sm shadow-lg group/item ${activeTrack?.slug === track.slug ? "bg-[#858585]" : "bg-[#606060]"} duration-300 bg-opacity-30 hover:bg-[#707070]/50`}
        >
          <div className="flex items-center gap-4">
            {track.album.image.length > 0 ? (
              <Image
                src={track.album.image}
                alt={track.title}
                width={72}
                height={72}
                className="object-cover h-full rounded-tl-md rounded-bl-md aspect-square"
              />
            ) : (
              <Album size={20}/>
            )}
            <h4
              className="font-semibold text-base truncate whitespace-normal line-clamp-2">{`${track.title}`}</h4>
          </div>

          <div>
            <PlayTrackButton
              track={track}
              tracks={tracks}
              index={index}
              variant="filled"
              className={`${activeTrack?.slug === track.slug ? "visible" : "invisible"} w-12 h-12 shadow-md text-3xl group/btn group-hover/item:visible`}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
