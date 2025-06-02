"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Loader from "@/components/general/Loader";
import useRegisterForm from "@/hooks/useRegisterForm";
import ErrorField from "@/components/forms/error-field";
import React from "react";
import { OrSeparator } from "@/components/ui/separator";
import { continueWithGoogle } from "@/utils";
import { Switch } from "../ui/switch";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../svg/social";
import PasswordRequirements from "../others/PasswordRequirements";


export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    setValue,
    watch,
  } = useRegisterForm()

  const handleChange = (checked: boolean) => {
    setValue("type_profile", checked ? "artist" : "user")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email address</Label>
            <ErrorField message={errors.email?.message} />
          </div>
          <Input
            placeholder="name@domain.com"
            {...register("email")}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <ErrorField message={errors.password?.message} />
          </div>
          <Input
            type="password"
            placeholder="Enter a password"
            {...register("password")}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password Confirm</Label>
            <ErrorField message={errors.re_password?.message} />
          </div>
          <Input
            type="password"
            placeholder="Confirm a password"
            {...register("re_password")}
          />
        </div>
        <div className="py-3">
          <PasswordRequirements password={watch("password")} re_password={watch("re_password")} />
        </div>

        <div className="pb-3 space-x-2 flex items-center">
          <Switch defaultValue="user" name='type_profile' onCheckedChange={handleChange} />
          <Label htmlFor="type_profile">Artist</Label>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full text-md rounded-full text-gray-200 font-bold"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Sign up"}
        </Button>
      </div>

      <OrSeparator className="my-8" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-full bg-black text-md font-medium border-white/50"
          onClick={continueWithGoogle}
        >
          <GoogleIcon />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-full bg-black text-md font-medium border-white/50"
        >
          <FacebookIcon />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-full bg-black text-md font-medium border-white/50"
        >
          <AppleIcon />
        </Button>
      </div>

    </form>
  )
}