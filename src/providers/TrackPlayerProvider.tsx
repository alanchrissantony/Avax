"use client";

import React, {useEffect, useState, createContext, useContext, Dispatch, SetStateAction, useCallback} from "react";
import {useAppSelector, useAppDispatch} from "@/lib/hooks";
import {nextSong as nextSongAction, prevSong as prevSongAction} from "@/lib/features/tracks/trackSlice";
import {Track} from "@/types/types";
import {usePathname} from "next/navigation";
import {accountAuthUrl} from "@/utils/consts";

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
  const pathname = usePathname();
  const isAccountAuthPage = pathname.startsWith(accountAuthUrl);

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
      tempAudio.removeEventListener("loadeddata", setAudioData);
      tempAudio.removeEventListener("timeupdate", setAudioTime);
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

  const play = useCallback(async () => {
    setIsPlaying(true);
    await currentTrackAudio?.play();
  }, [currentTrackAudio]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    currentTrackAudio?.pause();
  }, [currentTrackAudio]);

  const togglePlay = useCallback(async () => {
    if (isPlaying) pause();
    else await play();
  }, [isPlaying, pause, play]);

  useEffect(() => {
    if (currentTrackAudio) {
      currentTrackAudio.currentTime = Math.round((drag * currentTrackAudio.duration) / 100);
    }
  }, [drag]);

  useEffect(() => {
    if (currentTrackAudio) {
      currentTrackAudio.volume = volume;
    }
  }, [volume]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    if (currentTrackAudio) {
      currentTrackAudio.muted = !isMuted;
    }
  }, [isMuted, currentTrackAudio]);

  const setMute = useCallback((mute: boolean) => {
    setIsMuted(mute);
    if (currentTrackAudio) {
      currentTrackAudio.muted = mute;
    }
  }, [currentTrackAudio]);

  const shuffleArray = useCallback((array: Track[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }, []);

  const nextTrack = useCallback(() => {
    if (currentTracks) {
      if (shuffle) {
        const shuffledTracks = shuffleArray(currentTracks);
        const nextIndex = shuffledTracks.findIndex((track) => track.id === activeTrack?.id) + 1;
        if (nextIndex >= shuffledTracks.length) {
          dispatch(nextSongAction(shuffledTracks[0].id));
        } else {
          dispatch(nextSongAction(shuffledTracks[nextIndex].id));
        }
      } else if (currentIndex < currentTracks.length - 1) {
        dispatch(nextSongAction(currentIndex + 1));
      }
    }
  }, [currentTracks, shuffle, currentIndex, activeTrack, shuffleArray, dispatch]);


  const prevTrack = useCallback(() => {
    if (currentTracks) {
      if (shuffle) {
        const shuffledTracks = shuffleArray(currentTracks);
        dispatch(prevSongAction(shuffledTracks.findIndex((track) => track.id === activeTrack?.id) - 1));
      } else if (currentIndex > 0) {
        dispatch(prevSongAction(currentIndex - 1));
      }
    }
  }, [currentTracks, shuffle, currentIndex, activeTrack, shuffleArray, dispatch]);

  const toggleShuffle = useCallback(() => {
    setShuffle(prevShuffle => !prevShuffle);
  }, []);

  const toggleLoop = useCallback(() => {
    setLoop(prevLoop => !prevLoop);
  }, []);

  useEffect(() => {
    if (isAccountAuthPage && isPlaying) {
      pause();
    }
  }, [isPlaying, isAccountAuthPage, pause]);

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
