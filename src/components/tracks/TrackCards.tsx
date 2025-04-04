import CardItemGrid from "@/components/general/CardItemGrid";
import CardItem from "@/components/general/CardItem";
import {Track} from "@/types/types";


interface Props {
  tracks: Track[] | undefined;
}

export default function TrackCards({tracks}: Props) {

  return (
    <CardItemGrid>
      {tracks?.map((track) => (
        <CardItem
          key={track.id}
          id={track.id}
          slug={track.slug}
          heading={track.title}
          subheading={track.artist.display_name}
          altTitle={track.title}
          image={track.image}
          track_slug={track.slug}
          type="albums"
        />
      ))}
    </CardItemGrid>
  );
}
