import Link from "next/link";
import React from "react";
import {loginUrl} from "@/utils/consts";
import ResendActivationCodeForm from "@/components/forms/resend-activation-code-form";

export default function Page() {
  return (
    <section className="space-y-8 max-w-xs">
      <div className="space-y-4 text-center mb-10 w-full">
        <h1 className="text-2xl font-bold">Resend Activation Code</h1>
        <p className="text-white/80 text-sm font-bold">
          If your account is inactive and you have not received the activation email, enter your email address with
          which you registered, an email will be sent to you again to activate your account.
        </p>
      </div>

      <ResendActivationCodeForm/>

      <div className="mt-4 text-center text-white/60 text-sm">
        Back to{' '}
        <Link href={loginUrl} className="underline hover:text-green-500 text-white/90 font-medium">
          Login
        </Link>
      </div>
    </section>
  )
}