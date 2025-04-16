import { Dot } from "lucide-react";
import Image from "next/image";
import TracksTable from "@/components/tracks/TracksTable";
import MainSection from "@/components/general/main-section";
import ContentSection from "@/components/general/content-section";

export const metadata = {
  title: "Avax - Liked Songs",
  description: "Songs liked by you",
};

export default async function LikedTracksPage() {
  // const likedTracks = await getUserLikedSongs(session);

  return (
    <MainSection>
      <ContentSection>
      <div className="flex items-end gap-6">
        <Image
          src="/images/avax_like.png"
          alt="Liked Songs"
          height={208}
          width={208}
          priority
        />
        <div className="flex flex-col gap-3">
          <h5 className="text-sm font-bold">Playlist</h5>
          <h2 className="mt-2 text-6xl font-bold">Liked Songs</h2>

          <div className="flex items-center text-sm font-semibold">
            {/*<span>{session?.user.name}</span>*/}
            {/*{likedTracks.total > 0 && (*/}
              <>
                <Dot />
                {/*<span>{likedTracks.total} songs</span>*/}
              </>
            {/*)}*/}
          </div>
        </div>
      </div>

      {/*<TracksTable*/}
      {/*  tracks={likedTracks.items}*/}
      {/*  showHeader*/}
      {/*  showAlbum*/}
      {/*  showCover*/}
      {/*  showSubtitle*/}
      {/*/>*/}
      </ContentSection>
    </MainSection>
  );
}
