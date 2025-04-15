import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {AppleIcon, ChromeIcon, FacebookIcon} from "lucide-react";
import Link from "next/link";


export default function Page() {
  return (
    <section className="space-y-8">
      <div className="space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold">Log in to Avax</h1>
      </div>

      <div className="space-y-2">
        <Button variant="outline" size="lg"
                className="w-full rounded-full bg-black text-md font-medium border-white/50">
          <ChromeIcon className="mr-2 h-5 w-5"/>
          Continue with Google
        </Button>
        <Button variant="outline" size="lg"
                className="w-full rounded-full bg-black text-md font-medium border-white/50">
          <FacebookIcon className="mr-2 h-5 w-5"/>
          Continue with Facebook
        </Button>
        <Button variant="outline" size="lg"
                className="w-full rounded-full bg-black text-md font-medium border-white/50">
          <AppleIcon className="mr-2 h-5 w-5"/>
          Continue with Apple
        </Button>
      </div>
      <Separator className="my-8"/>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="Enter a email" required/>
        </div>
        <div className="space-y-2 pb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter a password" required/>
        </div>
        <Button type="submit" size="lg" className="w-full text-md rounded-full text-gray-200 font-bold bg-green-600">
          Log In
        </Button>
      </div>

      <div className="space-y-2 text-center">
        <Link
          href={`/auth/password-reset`}
          className="hover:text-green-500 underline text-sm text-white/90 font-medium"
        >
          Forgot your password?
        </Link>
      </div>

      <Separator className="my-8"/>

      <div className="flex items-center justify-center space-x-2">
        <p className="text-sm text-white/70 font-normal">Don't have an account?</p>
        <Link href={`/auth/signup`} className="hover:text-green-500 underline text-sm text-white/90 font-medium">
          Sign up for Avax
        </Link>
      </div>
    </section>
  )
}