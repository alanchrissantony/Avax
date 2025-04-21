"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";


interface Props {
  type: "artists" | "playlists" | "albums";
  slug: string;
  image: any;
  altTitle: string;
  heading: string;
  subtitle?: string;
}

export default function LibraryItemCard({type, slug, heading, image, altTitle, subtitle}: Props) {
  const pathname = usePathname();


  const href = `/${type}/${slug}`;
  const hrefMy = `/${type}/my/${slug}`;

  return (
    <Link
      href={href}
      className={`${
        (pathname === href || pathname === hrefMy) ? "bg-[#303030]/50" : ""
      } flex items-center p-2 gap-3 rounded-sm text-white cursor-pointer  hover:bg-[#404040]/20`}
    >
      <Image
        src={image}
        alt={altTitle}
        height={50}
        width={50}
        className={`${
          type === "artists" ? "rounded-full" : "rounded-md"
        } aspect-square object-cover`}
      />

      <div className="truncate">
        <h6 className="w-full text-sm font-semibold truncate">
          {heading}
        </h6>
        {type !== "artists" && (
          <span className="mt-1 text-xs font-semibold text-white/60">{subtitle}</span>
        )}
      </div>
    </Link>
  );
}
