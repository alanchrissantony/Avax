"use client";

import {MdPause, MdPlayArrow} from "react-icons/md";
import {setActiveTrack} from "@/lib/features/tracks/trackSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {Track} from "@/types/types";
import {usePlayer} from "@/providers/TrackPlayerProvider";

interface Props {
  variant?: "simple" | "filled";
  lines?: boolean;
  track?: Track | undefined;
  tracks?: Track[] | undefined;
  index?: number | null;
  className?: string;
}

export function AudioLines({className}: { className?: string }) {
  return (
    <div className={`audio-lines ${className}`}>
      <div className="line h-2"></div>
      <div className="line h-2"></div>
      <div className="line h-2"></div>
      <div className="line h-2"></div>
      <div className="line h-2"></div>
    </div>
  );
}

export default function PlayTrackButton({
                                          variant = "simple",
                                          lines = false,
                                          track = undefined,
                                          tracks = undefined,
                                          index = 0,
                                          className,
                                        }: Props) {
  const dispatch = useAppDispatch();
  const {activeTrack} = useAppSelector((state) => state.track);
  const {isPlaying, togglePlay} = usePlayer();

  const isPlayingButton = activeTrack?.slug === track?.slug;

  const simpleButtonStyle = "flex items-center col-span-1 text-white";
  const filledButtonStyle =
    "flex items-center justify-center rounded-full bg-primary";

  return (
    <button
      className={`${variant === "filled" && "hover:scale-105"} duration-100 drop-shadow-sm hover:drop-shadow-2xl ${
        variant === "filled" ? filledButtonStyle : simpleButtonStyle
      } ${className} ${!track && "cursor-not-allowed"}`}
      onClick={(e) => {
        e.preventDefault();
        dispatch(setActiveTrack({track, tracks, i: index}));
        togglePlay();
      }}
      disabled={!track}
    >
      {isPlayingButton && isPlaying ? (
        lines ? (
          <AudioLines className="flex items-center"/>
        ) : (
          <MdPause
            className={`${variant === "simple" ? "flex items-center text-white" : "flex items-center text-black"}`}/>
        )
      ) : (
        <MdPlayArrow
          className={
            variant === "filled"
              ? "text-black"
              : "flex items-center text-white"
          }
        />
      )}
    </button>
  );
}
