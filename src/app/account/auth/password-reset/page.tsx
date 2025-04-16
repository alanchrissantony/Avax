import PasswordResetForm from "@/components/forms/password-reset-form";
import Link from "next/link";
import React from "react";
import {loginUrl} from "@/utils/consts";

export default function Page() {
  return (
    <section className="space-y-8 max-w-xs">
      <div className="space-y-4 text-center mb-10 w-full">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-white/80 text-sm font-bold">Enter your email address or username, and we`ll send you a link
          to get back into your account.</p>
      </div>

      <PasswordResetForm/>

      <div className="mt-4 text-center text-white/60 text-sm">
        Did you remember your password?{" "}
        <Link href={loginUrl} className="underline hover:text-green-500 text-white/90 font-medium">
          Login
        </Link>
      </div>
    </section>
  )
}