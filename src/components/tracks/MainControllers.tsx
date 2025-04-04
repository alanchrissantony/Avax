"use client";

import {usePlayer} from "@/providers/TrackPlayerProvider";
import {fmtMSS} from "@/utils/clientUtils";
import * as Progress from "@radix-ui/react-progress";
import {Repeat2, Shuffle, SkipBack, SkipForward} from "lucide-react";
import {MdPause, MdPlayArrow} from "react-icons/md";

export default function MainControllers() {
  const {
    isPlaying,
    setSlider,
    setDrag,
    togglePlay,
    duration,
    currentTime,
    slider,
  } = usePlayer();

  return (
    <div className="flex flex-col items-center justify-center col-span-6 gap-3">
      <div className="flex items-center gap-5">
        <button>
          <Shuffle size={17} className="text-white/60 hover:text-gray-100"/>
        </button>
        <button>
          <SkipBack size={20} className="text-xl text-white/60 hover:text-gray-100"/>
        </button>
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-8 h-8 p-0 text-black bg-white rounded-full hover:scale-105 duration-150"
        >
          {isPlaying ? (
            <MdPause className="text-2xl text-paper-700"/>
          ) : (
            <MdPlayArrow className="text-2xl text-paper-700"/>
          )}
        </button>
        <button>
          <SkipForward size={20} className="text-white/60 hover:text-gray-100"/>
        </button>
        <button>
          <Repeat2 size={20} className="text-white/60 hover:text-gray-100"/>
        </button>
      </div>

      <div className="flex items-center justify-center w-full gap-2">
        <span className="text-xs text-gray-400 mb-1">
          {currentTime ? fmtMSS(currentTime * 1000) : "0:00"}
        </span>
        <Progress.Root
          className="relative w-[70%] h-1 overflow-hidden rounded-full bg-[#303030] mb-1"
          style={{transform: "translateZ(0)"}}
          value={slider}
        >
          <Progress.Indicator
            className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
            style={{transform: `translateX(-${100 - slider}%)`}}
          />
        </Progress.Root>
        {/* <input
          type="range"
          className={styles.player}
          value={slider}
          onChange={(e) => {
            setSlider(parseInt(e.target.value));
            setDrag(parseInt(e.target.value));
          }}
        /> */}
        <span className="text-xs text-gray-400 mb-1">
          {duration ? fmtMSS(duration * 1000) : "0:00"}
        </span>
      </div>
    </div>
  );
}
