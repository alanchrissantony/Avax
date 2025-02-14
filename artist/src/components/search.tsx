"use client"
import { useState } from "react";
import { SearchSimpleIcon } from "./svg/search";

export default function SearchComponent() {
    const [isSearching, setIsSearching] = useState(false);

    return (
        <div className="flex items-center gap-x-4 relative">
            
            <div
                onClick={() => setIsSearching(true)}
                className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-full 
                            transition-all duration-300 transform ${
                                isSearching ? "-translate-x-20 opacity-0" : "translate-x-0 opacity-100 bg-[#333]"
                            }`}
            >
                <SearchSimpleIcon size="16px" fill="#808080" />
            </div>

            
            <div
                className={`absolute flex items-center transition-all duration-300 transform ${
                    isSearching ? "translate-x-[-90px] opacity-100" : "translate-x-full opacity-0"
                }`}
            >
                <input
                    type="text"
                    placeholder="Filter"
                    autoFocus
                    className="w-32 h-8 px-8 bg-[#333] text-white text-sm rounded-lg outline-none border border-[#EB5757] 
                               transition-all duration-300"
                />
                <button
                    onClick={() => setIsSearching(false)}
                    className="absolute left-2 text-gray-400 hover:text-white"
                >
                    <SearchSimpleIcon size="16px" fill="#808080" />
                </button>
            </div>
        </div>
    );
}
