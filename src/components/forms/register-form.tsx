"use client";

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import Loader from "@/components/general/Loader";
import useRegisterForm from "@/hooks/useRegisterForm";
import ErrorField from "@/components/forms/error-field";
import React from "react";
import {Separator} from "@/components/ui/separator";
import {continueWithGoogle} from "@/utils";
import {AppleIcon, ChromeIcon, FacebookIcon} from "lucide-react";


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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            placeholder="name@domain.com"
            className={errors.email ? "border-red-800 border-2" : ""}
            {...register("email")}
          />
          {errors.email && <ErrorField message={errors.email.message}/>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="type_profile">Select Type Profile:</Label>
          <RadioGroup defaultValue="user" name='type_profile'
                      onValueChange={(value: string) => setValue("type_profile", value)}>
            <div className="flex items-center space-x-2 pb-1">
              <RadioGroupItem value="user" id="r1"/>
              <Label htmlFor="r1">User</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="artist" id="r2"/>
              <Label htmlFor="r2">Artist</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Enter a password"
            {...register("password")}
            className={errors.password ? "border-red-800 border-2" : ""}
          />
          {errors.password && <ErrorField message={errors.password.message}/>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password Confirm</Label>
          <Input
            type="password"
            placeholder="Confirm a password"
            {...register("re_password")}
            className={(watch("password") !== watch("re_password")) ? "border-red-800 border-2" : ""}
          />
          {(watch("password") !== watch("re_password")) && <ErrorField message="Passwords don't match"/>}
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full text-md rounded-full text-gray-200 font-bold bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? <Loader/> : "Sign up"}
        </Button>
      </div>

      <Separator className="my-8"/>

      <div className="space-y-2">
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-full bg-black text-md font-medium border-white/50"
          onClick={continueWithGoogle}
        >
          <ChromeIcon className="mr-2 h-5 w-5"/>
          Sign up with Google
        </Button>
        <Button variant="outline" size="lg"
                className="w-full rounded-full bg-black text-md font-medium border-white/50">
          <FacebookIcon className="mr-2 h-5 w-5"/>
          Sign up with Facebook
        </Button>
        <Button variant="outline" size="lg"
                className="w-full rounded-full bg-black text-md font-medium border-white/50">
          <AppleIcon className="mr-2 h-5 w-5"/>
          Sign up with Apple
        </Button>
      </div>
    </form>
  )
}