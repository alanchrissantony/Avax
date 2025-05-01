"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import Loader from "@/components/general/Loader";
import ErrorField from "@/components/forms/error-field";
import React from "react";
import useResendActivationCodeForm from "@/hooks/useResendActivationCodeForm";


export default function ResendActivationCodeForm() {
  const {
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    register,
  } = useResendActivationCodeForm()


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            placeholder="Enter a email"
            className={errors.email ? "border-red-800 border-2" : ""}
            {...register("email")}
          />
          {errors.email && <ErrorField message={errors.email.message}/>}
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