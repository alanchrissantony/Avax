"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Loader from "@/components/general/Loader";
import usePasswordResetConfirmForm from "@/hooks/usePasswordResetConfirmForm";
import ErrorField from "@/components/forms/error-field";
import React from "react";


interface Props {
  uid: string,
  token: string,
}

export default function PasswordResetConfirmForm({uid, token}: Props) {
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
          <Label htmlFor="password">New password</Label>
          <Input
            type="password"
            placeholder="Enter a password"
            {...register("new_password")}
            className={errors.new_password ? "border-red-800 border-2" : ""}
          />
          {errors.new_password && <ErrorField message={errors.new_password.message}/>}
        </div>
        <div className="space-y-2 pb-4">
          <Label htmlFor="password">Password confirm</Label>
          <Input
            type="password"
            placeholder="Confirm a password"
            {...register("re_new_password")}
            className={errors.re_new_password ? "border-red-800 border-2" : ""}
          />
          {errors.re_new_password && <ErrorField message={errors.re_new_password.message}/>}
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full text-md rounded-full text-gray-200 font-bold bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? <Loader/> : "Send Link"}
        </Button>
      </div>
    </form>
  )
}