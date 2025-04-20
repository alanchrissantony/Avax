import {Separator} from "@/components/ui/separator"
import {MyLicenseContainer} from "@/components/artists/MyLicenseContainer";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Artist license</h3>
        <p className="text-sm text-muted-foreground">
          Create update your license.
        </p>
      </div>
      <Separator/>
      <MyLicenseContainer/>
    </div>
  )
}