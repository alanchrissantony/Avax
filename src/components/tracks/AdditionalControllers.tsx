import {ListMusic, Mic2, Volume2} from "lucide-react";
import {Progress} from "@/components/ui/progress";

export default function AdditionalControllers() {
  return (
    <div className="flex items-center col-span-3 gap-3">
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
      <div className="w-20 mt-3">
        <div className="relative w-full pt-1">
          <div className="flex h-1 mb-4">
            <Progress value={20} className="w-full h-full bg-[#303030]"/>
          </div>
        </div>
      </div>
    </div>
  );
}
