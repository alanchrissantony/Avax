import Image from "next/image";
import { NextIcon, PlayIcon, PreviousIcon, RepeatIcon, ShuffleIcon } from "@/components/svg/controls";
import ExplicitIcon from "@/components/svg/explicit";
import { LikeFillIcon } from "@/components/svg/like";
import SoundControls from "@/components/player/slider";
import LyricsIcon from "../svg/lyrics";
import { MenuListIcon } from "../svg/menu";
import { VolumeDownIcon, VolumeUpIcon } from "../svg/volume";


export default function PlayerComponent() {
    return (
        <main className="w-full md:w-[95%] lg:w-[85%] h-[4rem] fixed bottom-0 bg-white dark:bg-[#0a0a0a]">
            <section className="w-11/12 m-auto flex items-center h-full justify-between">
                {/* Left Playback Controls */}
                <div className="flex gap-x-8 items-center">
                    <div className="flex items-center justify-center cursor-pointer">
                        <ShuffleIcon fill="#808080" size="18px" />
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <div className="cursor-pointer">
                            <PreviousIcon fill="#808080" size="20px" />
                        </div>
                        <div className="cursor-pointer">
                            <PlayIcon fill="#808080" size="20px" />
                        </div>
                        <div className="cursor-pointer">
                            <NextIcon fill="#808080" size="20px" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center cursor-pointer">
                        <RepeatIcon fill="#808080" size="18px" />
                    </div>
                </div>

                {/* Middle: Song Details */}
                <div className="flex items-center bg-[#f3f3f3] pr-3 h-full">
                    <div className="flex-shrink-0">
                        <Image
                            src="/img/edm.jpg"
                            width={48}
                            height={48}
                            alt="Edm Playlist"
                            className="rounded-md"
                        />
                    </div>
                    <div className="flex-grow px-4">
                        <div className="flex items-center justify-center">
                            <span className="text-base font-semibold text-gray-900 dark:text-white">
                                The Box
                            </span>
                            <span className="ml-2">
                                <ExplicitIcon />
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Roddy Rich &ndash; Please Excuse Me For Being Antisocial
                        </p>
                    </div>
                    <div className="flex-shrink-0 cursor-pointer">
                        <LikeFillIcon fill="#1DB954" size="18px" />
                    </div>
                </div>

                {/* Right Controls: Sound & Misc */}
                <div className="flex items-center justify-between w-3/12 gap-x-8">
                    {/* Volume Controls */}
                    <div className="flex items-center gap-x-4 w-8/12">
                        <div className="cursor-pointer hover:text-white transition-colors">
                            <VolumeDownIcon size="18px" fill="#808080" />
                        </div>
                        <div className="flex-1 w-6/12">
                            <SoundControls />
                        </div>
                        <div className="cursor-pointer hover:text-white transition-colors">
                            <VolumeUpIcon size="20px" fill="#808080" />
                        </div>
                    </div>
                    {/* Additional Controls */}
                    <div className="flex items-center gap-x-4 w-4/12">
                        <div className="cursor-pointer hover:text-white transition-colors">
                            <LyricsIcon size="24px" fill="#808080" />
                        </div>
                        <div className="cursor-pointer hover:text-white transition-colors">
                            <MenuListIcon size="28px" fill="#808080" />
                        </div>
                    </div>
                </div>

            </section>
        </main>


    )
}