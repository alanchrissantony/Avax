import {Music} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {RxHeartFilled} from "react-icons/rx";
import {Track} from "@/types/types";

interface IProps {
  activeTrack?: Track | null;
}

export default function PlayerTrackInfo({activeTrack}: IProps) {
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
        <Music size={56} className="mt-4 mb-4"/>
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
        <button className="block md:hidden lg:block">
          <RxHeartFilled className="text-xl text-white hover:text-green-500"/>
        </button>
      }
    </div>
  );
}
