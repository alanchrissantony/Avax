import {Separator} from "@/components/ui/separator"
import {MyTracksContainer} from "@/components/tracks/MyTracksContainer";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Artist tracks</h3>
        <p className="text-sm text-muted-foreground">
          Create update your tracks.
        </p>
      </div>
      <Separator/>
      <MyTracksContainer/>
    </div>
  )
}