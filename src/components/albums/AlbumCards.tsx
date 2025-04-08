import CardItemGrid from "@/components/general/CardItemGrid";
import CardItem from "@/components/general/CardItem";
import {Album} from "@/types/types";


interface Props {
  albums: Album[] | undefined;
}

export default function AlbumCards({albums}: Props) {

  return (
    <CardItemGrid>
      {albums?.map((album) => (
        <CardItem
          key={album.id}
          id={album.id}
          slug={album.slug}
          heading={album.title}
          subheading={album.artist.display_name}
          altTitle={album.title}
          image={album.image}
          track_slug={album.track_slug}
          type="albums"
        />
      ))}
    </CardItemGrid>
  );
}
