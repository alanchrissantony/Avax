import CardItem from "../general/CardItem";
import CardItemGrid from "../general/CardItemGrid";
import {Artist} from "@/types/types";
import SkeletonCards from "@/components/ui/SkeletonCards";

interface Props {
  artists: Artist[] | undefined;
  isLoading?: boolean;
}

export default function ArtistCards({artists, isLoading}: Props) {
  if (isLoading) return <SkeletonCards type="artist"/>

  return (
    <CardItemGrid>
      {artists?.map((artist) => (
        <CardItem
          key={artist.id}
          id={artist.id}
          slug={artist.slug}
          heading={artist.display_name}
          image={artist.image}
          altTitle={artist.display_name}
          subheading="Artist"
          imageRounded
          track_slug={artist.track_slug}
          type="artists"
        />
      ))}
    </CardItemGrid>
  );
}
