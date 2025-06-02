"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import Loader from "@/components/general/Loader";
import { continueWithGoogle } from "@/utils";
import useLoginForm from "@/hooks/useLoginForm";
import { artistProfileMyUrl, profileMyUrl } from "@/utils/consts";
import { OrSeparator } from "@/components/ui/separator";
import ErrorField from "@/components/forms/error-field";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../svg/social";


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
  } = useLoginForm();


  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) redirect(user?.type_profile === "artist" ? artistProfileMyUrl : profileMyUrl);
  }, [isAuthenticated, user?.type_profile]);


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
        <div className="space-y-2 pb-4">
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
        <Button
          type="submit"
          size="lg"
          className="w-full text-md rounded-full text-gray-200 font-bold"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Log In"}
        </Button>
      </div>
      <OrSeparator className="my-8" />
      <div className="space-y-2">
        <Button
          variant="outline"
          type="button"
          size="lg"
          className="w-full relative rounded-full bg-black text-md font-medium border-white/50 justify-center"
          onClick={continueWithGoogle}
        >
          <span className="absolute left-5 md:left-10">
            <GoogleIcon />
          </span>
          <span className="hidden sm:block">Continue with&nbsp;</span>Google
        </Button>
        <Button
          variant="outline"
          type="button"
          size="lg"
          className="w-full relative rounded-full bg-black text-md font-medium border-white/50 justify-center"
        >
          <span className="absolute left-5 md:left-10">
            <FacebookIcon />
          </span>
          <span className="hidden sm:block">Continue with&nbsp;</span>Facebook
        </Button>
        <Button
          variant="outline"
          type="button"
          size="lg"
          className="w-full relative rounded-full bg-black text-md font-medium border-white/50 justify-center"
        >
          <span className="absolute left-5 md:left-10">
            <AppleIcon />
          </span>
          <span className="hidden sm:block">Continue with&nbsp;</span>Apple
        </Button>
      </div>
    </form>
  )
}