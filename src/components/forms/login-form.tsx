"use client";

import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React, {useEffect} from "react";
import {useAppSelector} from "@/lib/hooks";
import Loader from "@/components/general/Loader";
import {continueWithGoogle} from "@/utils";
import useLoginForm from "@/hooks/useLoginForm";
import {profileMyUrl} from "@/utils/consts";
import {AppleIcon, ChromeIcon, FacebookIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import ErrorField from "@/components/forms/error-field";


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
  } = useLoginForm();


  const {isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) redirect(profileMyUrl);
  }, [isAuthenticated]);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Button
          variant="outline"
          type="button"
          size="lg"
          className="w-full rounded-full bg-black text-md font-medium border-white/50"
          onClick={continueWithGoogle}
        >
          <ChromeIcon className="mr-2 h-5 w-5"/>
          Continue with Google
        </Button>
        <Button
          variant="outline"
          type="button"
          size="lg"
          className="w-full rounded-full bg-black text-md font-medium border-white/50"
        >
          <FacebookIcon className="mr-2 h-5 w-5"/>
          Continue with Facebook
        </Button>
        <Button
          variant="outline"
          type="button"
          size="lg"
          className="w-full rounded-full bg-black text-md font-medium border-white/50"
        >
          <AppleIcon className="mr-2 h-5 w-5"/>
          Continue with Apple
        </Button>
      </div>
      <Separator className="my-8"/>

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
        <div className="space-y-2 pb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Enter a password"
            {...register("password")}
            className={errors.password ? "border-red-800 border-2" : ""}
          />
          {errors.password && <ErrorField message={errors.password.message}/>}
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full text-md rounded-full text-gray-200 font-bold bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? <Loader/> : "Log In"}
        </Button>
      </div>
    </form>
  )
}