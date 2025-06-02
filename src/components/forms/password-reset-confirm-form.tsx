"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/general/Loader";
import usePasswordResetConfirmForm from "@/hooks/usePasswordResetConfirmForm";
import ErrorField from "@/components/forms/error-field";
import React from "react";


interface Props {
  uid: string,
  token: string,
}

export default function PasswordResetConfirmForm({ uid, token }: Props) {
  const {
    errors,
    isLoading,
    onSubmit,
    register,
    handleSubmit,
  } = usePasswordResetConfirmForm(uid, token)


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">New password</Label>
            <ErrorField message={errors?.new_password?.message} />
          </div>
          <Input
            type="password"
            placeholder="Enter a password"
            {...register("new_password")}
          />
        </div>
        <div className="space-y-2 pb-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password confirm</Label>
            <ErrorField message={errors?.re_new_password?.message} />
          </div>
          <Input
            type="password"
            placeholder="Confirm a password"
            {...register("re_new_password")}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full text-md rounded-full text-gray-200 font-bold"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Send Link"}
        </Button>
      </div>
    </form>
  )
}