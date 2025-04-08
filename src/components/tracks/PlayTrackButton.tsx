"use client";

import {MdPause, MdPlayArrow} from "react-icons/md";
import {setActiveTrack} from "@/lib/features/tracks/trackSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {Track} from "@/types/types";
import {usePlayer} from "@/providers/TrackPlayerProvider";

interface Props {
  variant?: "simple" | "filled";
  track?: Track | null;
  tracks?: Track[] | null;
  index?: number | null;
  className?: string;
}

export default function PlayTrackButton({
                                          variant = "simple",
                                          track = null,
                                          tracks = null,
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
      className={`hover:scale-105 duration-100 drop-shadow-sm hover:drop-shadow-2xl ${
        variant === "filled" ? filledButtonStyle : simpleButtonStyle
      } ${className} ${!track && "cursor-not-allowed"}`}
      onClick={(e) => {
        e.preventDefault();
        dispatch(setActiveTrack({track, tracks, i: index}));
        togglePlay();
      }}
      disabled={track === null}
    >
      {isPlayingButton && isPlaying ? (
        <MdPause className="text-black"/>
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
