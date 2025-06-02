"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/general/Loader";
import usePasswordResetForm from "@/hooks/usePasswordResetForm";
import ErrorField from "@/components/forms/error-field";
import React from "react";


export default function PasswordResetForm() {
  const {
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    register,
  } = usePasswordResetForm()


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email address</Label>
            <ErrorField message={errors.email?.message} />
          </div>
          <Input
            placeholder="Enter a email"
            {...register("email")}
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