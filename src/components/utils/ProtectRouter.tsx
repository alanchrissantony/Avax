"use client";

import {redirect} from "next/navigation";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import {useAppSelector} from "@/lib/hooks";
import {loginUrl} from "@/utils/consts";
import {useRetrieveUserMeQuery} from "@/lib/features/auth/authApiSlice";

interface Props {
  allowedRoles?: string[];
  children: React.ReactNode;
}


export default function ProtectRouter({children, allowedRoles = ["User", "Artist"]}: Props) {
  const {isAuthenticated} = useAppSelector(state => state.auth)
  const {
    data: user,
    isLoading,
    isFetching,
    isError,
  } = useRetrieveUserMeQuery({}, {skip: !isAuthenticated});


  if (isLoading || isFetching) {
    return <FullScreenSpinner/>
  }

  if (!user && isError && !isAuthenticated) {
    redirect(loginUrl);
  }

  if (!user && !isAuthenticated) return <FullScreenSpinner/>;

  if (!allowedRoles.includes(user?.type_profile as string)) {
    return redirect('/');
  }

  return <>{children}</>
};
