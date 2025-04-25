import {usePlayer} from "@/providers/TrackPlayerProvider";
import {fmtMSS} from "@/utils/clientUtils";
import {Dot, Repeat2, Shuffle, SkipBack, SkipForward} from "lucide-react";
import {MdPause, MdPlayArrow} from "react-icons/md";
import {Slider} from "@/components/ui/slider";

export default function MainControllers() {
  const {
    isPlaying,
    setSlider,
    setDrag,
    togglePlay,
    duration,
    currentTime,
    slider,
    loop,
    toggleLoop,
    shuffle,
    toggleShuffle,
    nextTrack,
    prevTrack,
    currentIndex,
    currentTrackAudio,
    tracks,
  } = usePlayer();

  const hasPrevTrack = currentIndex > 0;
  const hasNextTrack = currentIndex < tracks.length - 1;

  return (
    <div className="flex flex-col items-center justify-center col-span-4 sm:col-span-6 gap-2">
      <div className="flex items-center gap-5">

        <button onClick={toggleShuffle} className="flex items-center w-9 disabled:cursor-not-allowed"
                disabled={tracks.length <= 1}>
          {!shuffle ? (
            <>
              <Dot size={15} className={`invisible text-green-500`}/>
              <Shuffle
                size={17}
                className={`${tracks.length > 1 ? "text-white/60 hover:text-gray-100" : "text-white/20"}`}
              />
            </>
          ) : (
            <>
              <Dot size={15} className={`text-green-500`}/>
              <Shuffle
                size={17}
                className={`text-green-500 hover:text-green-300`}
              />
            </>
          )}
        </button>

        <button onClick={prevTrack} disabled={!hasPrevTrack}>
          <SkipBack size={20} strokeWidth={3}
                    className={`text-xl ${hasPrevTrack ? 'text-white/60 hover:text-gray-100' : 'text-white/20 cursor-not-allowed'}`}/>
        </button>
        <button
          onClick={togglePlay}
          className="flex items-center justify-center h-8 w-8 text-black bg-white rounded-full hover:scale-105 duration-150 disabled:cursor-not-allowed disabled:bg-white/20"
          disabled={!currentTrackAudio}
        >
          {isPlaying ? (
            <MdPause className="text-2xl"/>
          ) : (
            <MdPlayArrow className="text-2xl"/>
          )}
        </button>
        <button onClick={nextTrack} disabled={!hasNextTrack}>
          <SkipForward size={20} strokeWidth={3}
                       className={`text-xl ${hasNextTrack ? 'text-white/60 hover:text-gray-100' : 'text-white/20 cursor-not-allowed'}`}/>
        </button>
        <button onClick={toggleLoop} className="flex items-center">
          {!loop ? (
            <>
              <Repeat2
                size={20}
                className={`text-white/60 hover:text-gray-100`}
              />
              <Dot size={15} className={`invisible text-green-500`}/>
            </>
          ) : (
            <>
              <Repeat2
                size={20}
                className={`text-green-500 hover:text-green-300`}
              />
              <Dot size={15} className={`text-green-500`}/>
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center w-full gap-2">
        <span className="text-xs text-gray-400 mb-1">
          {currentTime ? fmtMSS(currentTime * 1000) : "-:--"}
        </span>

        <Slider
          value={[slider]}
          max={100}
          step={1}
          onValueChange={(value) => {
            setDrag(value[0]);
            setSlider(value[0]);
          }}
          className="bg-[#303030] w-full sm:w-[70%]"
        />
        <span className="text-xs text-gray-400 mb-1">
          {duration ? fmtMSS(duration * 1000) : "-:--"}
        </span>
      </div>
    </div>
  );
}
