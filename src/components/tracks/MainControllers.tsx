import { usePlayer } from "@/providers/TrackPlayerProvider";
import { fmtMSS } from "@/utils/clientUtils";
import { Repeat2, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { Slider } from "@/components/ui/slider";

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
    setLoop,
    nextTrack,
    prevTrack,
    currentIndex,
    tracks,
  } = usePlayer();

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const hasPrevTrack = currentIndex > 0;
  const hasNextTrack = currentIndex < tracks.length - 1;

  return (
    <div className="flex flex-col items-center justify-center col-span-6 gap-3">
      <div className="flex items-center gap-5">
        <button>
          <Shuffle size={17} className={`text-white/60 hover:text-gray-100`} />
        </button>
        <button onClick={prevTrack} disabled={!hasPrevTrack}>
          <SkipBack size={20} className={`text-xl ${hasPrevTrack ? 'text-white/60 hover:text-gray-100' : 'text-white/20 cursor-not-allowed'}`} />
        </button>
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-8 h-8 p-0 text-black bg-white rounded-full hover:scale-105 duration-150"
        >
          {isPlaying ? (
            <MdPause className="text-2xl text-paper-700" />
          ) : (
            <MdPlayArrow className="text-2xl text-paper-700" />
          )}
        </button>
        <button onClick={nextTrack} disabled={!hasNextTrack}>
          <SkipForward size={20} className={`text-xl ${hasNextTrack ? 'text-white/60 hover:text-gray-100' : 'text-white/20 cursor-not-allowed'}`} />
        </button>
        <button onClick={toggleLoop}>
          <Repeat2
            size={20}
            className={`text-white/60 hover:text-gray-100 ${loop ? "text-green-400" : ""}`}
          />
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
          className="bg-[#303030] w-[70%]"
        />
        <span className="text-xs text-gray-400 mb-1">
          {duration ? fmtMSS(duration * 1000) : "-:--"}
        </span>
      </div>
    </div>
  );
}
