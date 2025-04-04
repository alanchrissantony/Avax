import {Music} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {MdPlayArrow} from "react-icons/md";
import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import {useRetrieveTrackQuery} from "@/lib/features/other/publicApiSlice";


interface Props {
  image: any;
  id: number;
  slug: string;
  altTitle: string;
  heading: string;
  subheading?: string;
  imageRounded?: boolean;
  track_slug?: string;
  type: string;
}

export default function CardItem({
                                   image,
                                   id,
                                   slug,
                                   altTitle,
                                   heading,
                                   subheading,
                                   imageRounded = false,
                                   track_slug,
                                   type,
                                 }: Props) {
  const {data: track} = useRetrieveTrackQuery(track_slug || "");

  return (
    <Link href={`/${type}/${slug}`}>
      <div
        className={`h-full p-4 transition duration-300 rounded-md cursor-pointer group/item
        ${type === "artists" ? "hover:bg-gradient-to-t hover:from-[#242424]" : "hover:bg-[#202020]"}`}>
        <div className="relative">
          {image.length > 0 ? (
            <Image
              src={image}
              alt={altTitle}
              height={160}
              width={160}
              className={`aspect-square object-cover w-full ${
                imageRounded ? "rounded-full" : "rounded-md"
              }`}
            />
          ) : (
            <div className="w-full h-40">
              <Music className="w-full h-full bg-paper "/>
            </div>
          )}
          <PlayTrackButton
            track={track}
            variant="filled"
            className="absolute invisible w-12 h-12 text-3xl shadow-lg bottom-2 right-2 group/btn group-hover/item:visible"
          />
        </div>

        <h3 className="mt-2 font-bold text-base truncate">{heading}</h3>
        {subheading && (
          <h6 className="mt-1 text-xs font-semibold truncate text-white/70">
            {subheading}
          </h6>
        )}
      </div>
    </Link>
  );
}
