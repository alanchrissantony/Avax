import {useEffect, useRef} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useAppDispatch} from "@/lib/hooks";
import {setAuth} from "@/lib/features/auth/authSlice";
import {toast} from "react-toastify";
import {loginUrl, profileMyUrl} from "@/utils/consts";


export default function useSocialAuth(authenticate: any, provider: string) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams()

  const effectRan = useRef(false);

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");
    if (state && code && !effectRan.current) {
      authenticate({provider, state, code})
        .unwrap()
        .then(() => {
          dispatch(setAuth());
          toast.success('Logged in')
          router.push(profileMyUrl)
        })
        .catch((error: any) => {
          toast.error(error?.data?.detail || 'Error logging')
          router.push(loginUrl)
        });
    }

    return () => {
      effectRan.current = true;
    }
  }, [authenticate, dispatch, provider, router, searchParams])
}