"use client";
import {Separator} from "@/components/ui/separator"
import {useRetrieveUserProfileQuery} from "@/lib/features/auth/authApiSlice";
import {AccountForm} from "@/components/forms/account-form";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";

export default function Page() {
  const {data: user, isLoading, isFetching} = useRetrieveUserProfileQuery({})

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator/>
      {isLoading || isFetching ? <FullScreenSpinner/> :
        <AccountForm user={user}/>
      }
    </div>
  )
}