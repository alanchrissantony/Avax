"use client";

import {MdPlayArrow} from "react-icons/md";
import {setCurrentTrack} from "@/lib/features/tracks/trackSlice";
import {useAppDispatch} from "@/lib/hooks";
import {Track} from "@/types/types";

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


  const simpleButtonStyle = "flex items-center col-span-1 text-white";
  const filledButtonStyle =
    "flex items-center justify-center rounded-full bg-primary";

  return (
    <button
      className={`hover:scale-105 duration-150 ${
        variant === "filled" ? filledButtonStyle : simpleButtonStyle
      } ${className} ${!track && "cursor-not-allowed"}`}
      onClick={(e) => {
        e.preventDefault();
        if (track) {
          dispatch(setCurrentTrack(track));
        }
      }}
      disabled={track === null}
    >
      <MdPlayArrow
        className={
          variant === "filled"
            ? "text-black"
            : "flex items-center text-white"
        }
      />
    </button>
  );
}
