"use client";

import {MdPause, MdPlayArrow} from "react-icons/md";
import {setCurrentTrack} from "@/lib/features/tracks/trackSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {Track} from "@/types/types";
import {usePlayer} from "@/providers/TrackPlayerProvider";

interface Props {
  variant?: "simple" | "filled";
  track?: Track | undefined;
  className?: string;
}

export default function PlayTrackButton({
                                          variant = "simple",
                                          track,
                                          className,
                                        }: Props) {
  const dispatch = useAppDispatch();
  const {currentTrack} = useAppSelector(state => state.track);
  const {isPlaying, togglePlay} = usePlayer();

  const isPlayingButton = currentTrack?.slug === track?.slug


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
        if (track) {
          dispatch(setCurrentTrack(track));
          togglePlay();
        }
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
