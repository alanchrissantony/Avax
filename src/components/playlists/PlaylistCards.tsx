import CardItemGrid from "@/components/general/CardItemGrid";
import CardItem from "@/components/general/CardItem";
import {Playlist} from "@/types/types";
import SkeletonCards from "@/components/ui/SkeletonCards";


interface Props {
  playlists: Playlist[] | undefined;
  isLoading?: boolean;
}

export default function PlaylistCards({playlists, isLoading}: Props) {
  if (isLoading) return <SkeletonCards/>

  return (
    <CardItemGrid>
      {playlists?.map((playlist) => (
        <CardItem
          key={playlist.id}
          id={playlist.id}
          slug={playlist.slug}
          heading={playlist.title}
          subheading={playlist.user.display_name}
          altTitle={playlist.title}
          image={playlist.image}
          track_slug={playlist.track_slug}
          type="playlists"
        />
      ))}
    </CardItemGrid>
  );
}
