import {Separator} from "@/components/ui/separator"
import WorkInProgress from "@/components/ui/work-in-progress";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Payment</h3>
        <p className="text-sm text-muted-foreground">
          Your order history and payments.
        </p>
      </div>
      <Separator/>
      <WorkInProgress/>
    </div>
  )
}