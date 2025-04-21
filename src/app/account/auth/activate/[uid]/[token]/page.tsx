"use client";
import {useActivationMutation} from "@/lib/features/auth/authApiSlice";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {loginUrl} from "@/utils/consts";

interface Props {
  params: {
    uid: string,
    token: string,
  }
}


export default function Page({params}: Props) {
  const router = useRouter();
  const [activation] = useActivationMutation()

  useEffect(() => {
    const {uid, token} = params

    activation({uid, token})
      .unwrap()
      .then(() => {
        toast.success("Account activated.")
      })
      .catch((error) => {
        toast.error(error?.data?.detail || "Failed to activate account")
      })
      .finally(() => {
        router.push(loginUrl)
      });
  }, [activation, params, router])


  return (
    <section className="my-10">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-green-600 tracking-tighter sm:text-5xl">
            Activating your account...
          </h1>
          <p
            className="w-full text-sm/relaxed md:text-base/relaxed text-white/60"
          >
            Please wait. Then you redirect to login page
          </p>
        </div>
      </div>
    </section>
  )
}
