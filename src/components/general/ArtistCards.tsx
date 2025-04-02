import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";
import {Artist} from "@/types/types";

interface Props {
  artists: Artist[] | undefined;
}

export default function ArtistCards({artists}: Props) {
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
          type="artists"
        />
      ))}
    </CardItemGrid>
  );
}
