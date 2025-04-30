import {ListMusic, Mic2, Volume, Volume1, Volume2, VolumeX, Download, Maximize2, Minimize2} from "lucide-react";
import {Slider} from "@/components/ui/slider";
import {usePlayer} from "@/providers/TrackPlayerProvider";
import {useEffect, useState} from "react";
import {useAppSelector} from "@/lib/hooks";
import {useLazyDownloadTrackQuery} from "@/lib/features/tracks/trackApiSlice";
import Loader from "@/components/general/Loader";

export default function AdditionalControllers() {
  const {
    volume,
    setVolume,
    isMuted,
    toggleMute,
  } = usePlayer();

  const {user} = useAppSelector(state => state.auth);
  const {activeTrack} = useAppSelector(state => state.track);

  const [triggerDownloadTrack, {isFetching: isDownloading}] = useLazyDownloadTrackQuery();

  const handleDownloadTrack = () => {
    if (activeTrack?.slug) {
      triggerDownloadTrack(activeTrack.slug)
        .unwrap()
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `track-${activeTrack.slug}.mp3`);
          document.body.appendChild(link);
          link.click();
          link.parentNode?.removeChild(link);
        })
        .catch(error => console.error('Failed to download track', error));
    }
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);
    document.addEventListener("webkitfullscreenchange", fullscreenChangeHandler);
    document.addEventListener("msfullscreenchange", fullscreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
      document.removeEventListener("webkitfullscreenchange", fullscreenChangeHandler);
      document.removeEventListener("msfullscreenchange", fullscreenChangeHandler);
    };
  }, []);

  let volumeIcon = <Volume2 size={20} className="text-white/60 hover:text-gray-100"/>;

  if (volume < 0.1) {
    volumeIcon = <Volume size={20} className="text-white/60 hover:text-gray-100"/>;
  } else if (volume < 0.5) {
    volumeIcon = <Volume1 size={20} className="text-white/60 hover:text-gray-100"/>;
  }

  return (
    <div className="flex items-center absolute right-5 col-span-1 sm:col-span-3 gap-3">
      {/* Icons */}
      {user?.is_premium && (
        <button
          className="hidden lg:block disabled:cursor-not-allowed"
          onClick={handleDownloadTrack}
          disabled={isDownloading}
        >
          {isDownloading ? <Loader className="w-[20px] h-[20px]"/> : <Download size={20} className="text-white/60 hover:text-gray-100"/>}
        </button>
      )}
      <button className="hidden md:block">
        <Mic2 size={20} className="text-white/60 hover:text-gray-100"/>
      </button>
      <button className="hidden md:block">
        <ListMusic size={20} className="text-white/60 hover:text-gray-100"/>
      </button>
      <button className="" onClick={toggleMute}>
        {isMuted ? (
          <VolumeX size={20} className="text-red-600 hover:text-red-800"/>
        ) : (
          volumeIcon
        )}
      </button>

      {/* Volume bar */}
      <div className="w-28 mt-3 hidden sm:block">
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

      <button className="hidden lg:block" onClick={handleFullscreenToggle}>
        {isFullscreen ? (
          <Minimize2 size={16} strokeWidth={2.5} className="text-white/60 hover:text-gray-100"/>
        ) : (
          <Maximize2 size={16} strokeWidth={2.5} className="text-white/60 hover:text-gray-100"/>
        )}
      </button>
    </div>
  );
}
