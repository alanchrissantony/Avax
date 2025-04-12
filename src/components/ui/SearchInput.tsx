"use client";

import {Search, X} from "lucide-react";
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";
import {setSearchQuery} from "@/lib/features/other/otherSlice";
import {useDispatch} from "react-redux";

export default function SearchInput() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {searchQuery} = useAppSelector(state => state.other)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search/${searchQuery}`);
  };

  return (
    <form
      className="flex items-center justify-between w-full gap-3 px-3 py-3 bg-[#242424] shadow-sm rounded-full hover:bg-[#282828]"
      onSubmit={handleSubmit}
    >
      <Search className="text-white/60"/>

      <input
        className="flex-grow w-full text-sm font-medium bg-transparent placeholder:text-white/50 text-white focus:outline-none"
        placeholder="What do you want to play?"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        spellCheck={false}
      />

      <button
        type="button"
        className={`flex items-center focus:outline-none ${
          searchQuery ? "visible" : "invisible"
        }`}
        onClick={() => dispatch(setSearchQuery(""))}
      >
        <X size={20} className="text-white/50 hover:text-white/70"/>
      </button>
    </form>
  );
}
