import PasswordResetConfirmForm from "@/components/forms/password-reset-confirm-form";
import React from "react";

interface Props {
  params: {
    uid: string;
    token: string;
  }
}

export default function PasswordReset({params: {uid, token}}: Props) {
  return (
    <section className="space-y-8 max-w-xs">
      <div className="space-y-4 text-center mb-10 w-full">
        <h1 className="text-4xl font-bold">Reset password confirm</h1>
        <p className="text-white/80 text-sm font-bold">Enter your new password below</p>
      </div>

      <PasswordResetConfirmForm uid={uid} token={token}/>

    </section>
  )
}