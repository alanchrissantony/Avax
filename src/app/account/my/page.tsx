"use client";
import {Separator} from "@/components/ui/separator"
import {useRetrieveUserProfileQuery} from "@/lib/features/auth/authApiSlice";
import Spinner from "@/components/general/Spinner";
import {AccountForm} from "@/components/forms/account-form";
import {useAppSelector} from "@/lib/hooks";

export default function Page() {
  const {isAuthenticated} = useAppSelector(state => state.auth)
  const {data: user, isLoading, isFetching} = useRetrieveUserProfileQuery({}, {skip: !isAuthenticated})

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator/>
      {isLoading || isFetching ? <Spinner size={200}/> :
        <AccountForm user={user}/>
      }
    </div>
  )
}