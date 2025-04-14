import {ListMusic, Mic2, Volume, Volume1, Volume2, VolumeX, Download} from "lucide-react";
import {Slider} from "@/components/ui/slider";
import {usePlayer} from "@/providers/TrackPlayerProvider";

export default function AdditionalControllers() {
  const {
    volume,
    setVolume,
    isMuted,
    toggleMute,
  } = usePlayer();

  let volumeIcon = <Volume2 size={20} className="text-white/60 hover:text-gray-100"/>;

  if (volume < 0.1) {
    volumeIcon = <Volume size={20} className="text-white/60 hover:text-gray-100"/>;
  } else if (volume < 0.5) {
    volumeIcon = <Volume1 size={20} className="text-white/60 hover:text-gray-100"/>;
  }

  return (
    <div className="flex items-center absolute right-5 col-span-3 gap-3">
      {/* Icons */}
      <button>
        <Download size={20} className="text-white/60 hover:text-gray-100"/>
      </button>
      <button>
        <Mic2 size={20} className="text-white/60 hover:text-gray-100"/>
      </button>
      <button>
        <ListMusic size={20} className="text-white/60 hover:text-gray-100"/>
      </button>
      <button onClick={toggleMute}>
        {isMuted ? (
          <VolumeX size={20} className="text-red-600 hover:text-red-800"/>
        ) : (
          volumeIcon
        )}
      </button>

      {/* Volume bar */}
      <div className="w-28 mt-3">
        <div className="relative w-full pt-1">
          <div className="flex h-1 mb-4">
            <Slider
              value={isMuted ? [0] : [volume * 100]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="bg-[#303030]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
