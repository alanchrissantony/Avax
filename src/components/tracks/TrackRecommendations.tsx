import {useListTrackQuery} from "@/lib/features/other/publicApiSlice";
import TracksTable from "@/components/tracks/TracksTable";

interface Props {
  genreSlug?: string;
}

export default function TrackRecommendations({genreSlug}: Props) {
  const {data: recommendations, isLoading, isFetching} = useListTrackQuery({genreSlug: genreSlug || ''})

  return (
    <div className="mt-16">
      <h1 className="font-bold text-2xl pb-1">Recommended</h1>
      <p className="text-sm text-white/60">Based on what`s in this playlist</p>
      <TracksTable
        tracks={recommendations?.results.slice(0, 10)}
        showAlbum
        showCover
        showSubtitle
      />
    </div>
  );
}
