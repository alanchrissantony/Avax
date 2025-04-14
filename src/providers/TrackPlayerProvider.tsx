"use client";

import React, {useEffect, useState, createContext, useContext, Dispatch, SetStateAction} from "react";
import {useAppSelector, useAppDispatch} from "@/lib/hooks";
import {nextSong as nextSongAction, prevSong as prevSongAction} from "@/lib/features/tracks/trackSlice";
import {Track} from "@/types/types";

interface TrackProviderState {
  currentTrackAudio: HTMLAudioElement | null;
  isPlaying: boolean;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  duration: number;
  currentTime: number;
  slider: number;
  setSlider: Dispatch<SetStateAction<number>>;
  drag: number;
  setDrag: Dispatch<SetStateAction<number>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  loop: boolean;
  setLoop: Dispatch<SetStateAction<boolean>>;
  isMuted: boolean;
  toggleMute: () => void;
  setMute: (mute: boolean) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  shuffle: boolean;
  toggleShuffle: () => void;
  toggleLoop: () => void;
  currentIndex: number;
  tracks: Track[];
}

const PlayerContext = createContext<TrackProviderState>({} as TrackProviderState);

interface Props {
  children: React.ReactNode;
}

export default function TrackPlayerProvider({children}: Props) {
  const {activeTrack, currentIndex, currentTracks} = useAppSelector((state) => state.track);
  const dispatch = useAppDispatch();

  const [currentTrackAudio, setCurrentTrackAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [slider, setSlider] = useState(1);
  const [drag, setDrag] = useState(0);
  const [volume, setVolume] = useState(0.33);
  const [loop, setLoop] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    if (!activeTrack) return;
    if (isPlaying) {
      pause();
      setCurrentTrackAudio(null);
    }
    const tempAudio = new Audio(activeTrack.file);

    const setAudioData = () => {
      setDuration(tempAudio.duration);
      setCurrentTime(tempAudio.currentTime);
    };

    const setAudioTime = () => {
      const currTime = tempAudio.currentTime;
      setCurrentTime(currTime);
      setSlider(currTime ? Number(((currTime * 100) / tempAudio.duration).toFixed(1)) : 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      nextTrack();
    };

    tempAudio.addEventListener("loadeddata", setAudioData);
    tempAudio.addEventListener("timeupdate", setAudioTime);
    tempAudio.addEventListener("ended", handleEnded);
    tempAudio.preload = "none";
    tempAudio.volume = volume;
    tempAudio.loop = loop;

    setCurrentTrackAudio(tempAudio);

    return () => {
      tempAudio.removeEventListener("ended", handleEnded);
      pause();
      setCurrentTrackAudio(null);
    };
  }, [activeTrack, loop]);

  useEffect(() => {
    const handlePlay = async () => {
      if (currentTrackAudio) {
        await play();
      }
    };
    handlePlay();
  }, [currentTrackAudio]);

  const togglePlay = async () => {
    if (isPlaying) pause();
    else await play();
  };

  const play = async () => {
    setIsPlaying(true);
    await currentTrackAudio?.play();
  };

  const pause = () => {
    setIsPlaying(false);
    currentTrackAudio?.pause();
  };

  useEffect(() => {
    if (currentTrackAudio && drag) {
      currentTrackAudio.currentTime = Math.round((drag * currentTrackAudio.duration) / 100);
    }
  }, [drag]);

  useEffect(() => {
    if (currentTrackAudio) {
      currentTrackAudio.volume = volume;
    }
  }, [volume]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (currentTrackAudio) {
      currentTrackAudio.muted = !isMuted;
    }
  };

  const setMute = (mute: boolean) => {
    setIsMuted(mute);
    if (currentTrackAudio) {
      currentTrackAudio.muted = mute;
    }
  };

  const shuffleArray = (array: Track[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const nextTrack = () => {
    if (currentTracks) {
      if (shuffle) {
        const shuffledTracks = shuffleArray(currentTracks);
        dispatch(nextSongAction(shuffledTracks.findIndex((track) => track.id === activeTrack?.id) + 1));
      } else if (currentIndex < currentTracks.length - 1) {
        dispatch(nextSongAction(currentIndex + 1));
      }
    }
  };

  const prevTrack = () => {
    if (currentTracks) {
      if (shuffle) {
        const shuffledTracks = shuffleArray(currentTracks);
        dispatch(prevSongAction(shuffledTracks.findIndex((track) => track.id === activeTrack?.id) - 1));
      } else if (currentIndex > 0) {
        dispatch(prevSongAction(currentIndex - 1));
      }
    }
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const value = {
    currentTrackAudio,
    isPlaying,
    play,
    pause,
    togglePlay,
    duration,
    currentTime,
    slider,
    setSlider,
    drag,
    setDrag,
    volume,
    setVolume,
    loop,
    setLoop,
    isMuted,
    toggleMute,
    setMute,
    nextTrack,
    prevTrack,
    shuffle,
    toggleShuffle,
    toggleLoop,
    currentIndex,
    tracks: currentTracks || [],
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export const usePlayer = () => useContext(PlayerContext);