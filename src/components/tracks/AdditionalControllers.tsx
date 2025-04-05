import {ListMusic, Mic2, Volume2} from "lucide-react";
import {Progress} from "@/components/ui/progress";
import {Slider} from "@/components/ui/slider";
import {cn} from "@/lib/utils";
import {usePlayer} from "@/providers/TrackPlayerProvider";



export default function AdditionalControllers() {
  const { volume, setVolume } = usePlayer();

  return (
    <div className="flex items-center absolute right-5 col-span-3 gap-3">
      {/* Icons */}
      <button>
        <Mic2 size={20} className="text-white/60 hover:text-gray-100"/>
      </button>
      <button>
        <ListMusic size={20} className="text-white/60 hover:text-gray-100"/>
      </button>
      <button>
        <Volume2 size={20} className="text-white/60 hover:text-gray-100"/>
      </button>

      {/* Volume bar */}
      <div className="w-28 mt-3">
        <div className="relative w-full pt-1">
          <div className="flex h-1 mb-4">
            {/*<Slider*/}
            {/*  defaultValue={[33]}*/}
            {/*  max={100}*/}
            {/*  step={1}*/}
            {/*  className="bg-[#303030]"*/}
            {/*/>*/}
            <Slider
              value={[volume * 100]}
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
