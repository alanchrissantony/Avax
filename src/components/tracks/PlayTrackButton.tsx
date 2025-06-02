"use client";

import { MdPause, MdPlayArrow } from "react-icons/md";
import { setActiveTrack } from "@/lib/features/tracks/trackSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Track } from "@/types/types";
import { usePlayer } from "@/providers/TrackPlayerProvider";

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "duration-100 drop-shadow-sm hover:drop-shadow-2xl",
  {
    variants: {
      variant: {
        simple: "flex items-center col-span-1 text-white",
        filled: "flex items-center justify-center rounded-full bg-primary hover:scale-105",
        classic: "flex items-center justify-center rounded-lg",
      },
    },
    defaultVariants: {
      variant: "simple"
    },
  }
)

const iconVariants = cva(
  "",
  {
    variants: {
      variant: {
        simple: "text-white",
        filled: "flex items-center text-white",
        classic: "flex items-center text-white text-2xl",
      },
    },
    defaultVariants: {
      variant: "simple"
    },
  }
)

interface Props {
  variant?: "simple" | "filled" | "classic";
  lines?: boolean;
  track?: Track | undefined;
  tracks?: Track[] | undefined;
  index?: number | null;
  disabled?: boolean;
  className?: string;
  bgColor?: string;
}

export function AudioLines({ className }: { className?: string }) {
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
  disabled = !track,
  className,
  bgColor
}: Props) {
  const dispatch = useAppDispatch();
  const { activeTrack } = useAppSelector((state) => state.track);
  const { isPlaying, togglePlay } = usePlayer();

  const isPlayingButton = activeTrack?.slug === track?.slug;

  return (
    <button
      className={cn(buttonVariants({ variant, className }), !track && "cursor-not-allowed",)}
      style={variant === 'classic' ? { backgroundColor: bgColor } : undefined}
      onClick={(e) => {
        e.preventDefault();
        dispatch(setActiveTrack({ track, tracks, i: index }));
        togglePlay();
      }}
      disabled={disabled}
    >
      {isPlayingButton && isPlaying ? (
        lines ? (
          <AudioLines className="flex items-center" />
        ) : (
          <MdPause
            className={cn(iconVariants({ variant }))} />
        )
      ) : (
        <MdPlayArrow
          className={cn(iconVariants({ variant }))}
        />
      )}
      {variant === "classic" && (
        <span className="text-white text-base font-bold">
         Play
        </span>
      )}
    </button>
  );
}
