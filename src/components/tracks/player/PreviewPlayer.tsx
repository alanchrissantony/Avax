"use client";

import AdditionalControllers from "./AdditionalControllers";
import MainControllers from "./MainControllers";
import PlayerTrackInfo from "./PlayerTrackInfo";
import {useAppSelector} from "@/lib/hooks";
import FooterLogin from "@/components/general/FooterLogin";

export default function PreviewPlayer() {
  const {activeTrack} = useAppSelector(state => state.track);
  const {isAuthenticated} = useAppSelector(state => state.auth)

  if (!activeTrack && !isAuthenticated) return <FooterLogin/>;

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 grid grid-cols-12 gap-12 bg-background items-center justify-between px-5 ${
        activeTrack ? "py-3" : "py-0"
      }`}
    >
      <PlayerTrackInfo activeTrack={activeTrack}/>
      <MainControllers/>
      <AdditionalControllers/>
    </footer>
  );
}
