"use client";

import {searchFilterTags} from "@/utils/clientUtils";
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";

export default function SearchFilters() {
  const pathname = usePathname();
  const params = useParams();

  const query = params.query as string;

  const activeStyles = "bg-white text-gray-950";
  const inactiveStyles = "bg-[#262626] hover:bg-[#303030] text-white";

  return (
    <div className="flex items-center gap-2 text-sm">
      {searchFilterTags.map((tag) => {
        const href = `/search/${query}${tag.link}`;
        return (
          <Link
            key={tag.label}
            className={`px-3 py-1.5 font-medium transition-colors rounded-full ${
              pathname === href ? activeStyles : inactiveStyles
            }`}
            href={href}
          >
            {tag.label}
          </Link>
        );
      })}
    </div>
  );
}
