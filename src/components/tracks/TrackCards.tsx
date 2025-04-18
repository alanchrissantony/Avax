import CardItemGrid from "@/components/general/CardItemGrid";
import CardItem from "@/components/general/CardItem";
import {Track} from "@/types/types";
import SkeletonCards from "@/components/ui/SkeletonCards";


interface Props {
  tracks: Track[] | undefined;
  isLoading?: boolean;
}

export default function TrackCards({tracks, isLoading}: Props) {
  if (isLoading) return <SkeletonCards/>

  return (
    <CardItemGrid>
      {tracks?.map((track, index) => (
        <CardItem
          key={track.id}
          id={track.id}
          slug={track.slug}
          heading={track.title}
          subheading={track.artist.display_name}
          altTitle={track.title}
          image={track.album.image}
          track_slug={track.slug}
          tracks={tracks}
          index={index}
          type="tracks"
        />
      ))}
    </CardItemGrid>
  );
}
