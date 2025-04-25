"use client";

import AdditionalControllers from "./AdditionalControllers";
import MainControllers from "./MainControllers";
import PlayerTrackInfo from "./PlayerTrackInfo";
import {useAppSelector} from "@/lib/hooks";
import FooterLogin from "@/components/general/FooterLogin";
import {usePathname} from "next/navigation";
import {accountUrl} from "@/utils/consts";

export default function PreviewPlayer() {
  const {activeTrack} = useAppSelector(state => state.track);
  const {isAuthenticated} = useAppSelector(state => state.auth);
  const pathname = usePathname();
  const isAccountPage = pathname.startsWith(accountUrl);

  if (!activeTrack && isAccountPage) return null;
  if (!activeTrack && !isAuthenticated) return <FooterLogin/>;

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 grid grid-cols-6 sm:grid-cols-12 gap-12 bg-background overflow-auto items-center justify-between px-4 ${
        activeTrack ? "py-2" : "py-0"
      }`}
    >
      <PlayerTrackInfo activeTrack={activeTrack}/>
      <MainControllers/>
      <AdditionalControllers/>
    </footer>
  );
}
