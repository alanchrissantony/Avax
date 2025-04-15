import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {AppleIcon, ChromeIcon, FacebookIcon} from "lucide-react";
import Link from "next/link";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";


export default function Page() {
  return (
    <section>
      <div className="space-y-4 text-center mb-10">
        <h1 className="text-5xl font-bold">Sign up to start listening</h1>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="name@domain.com" required/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="type_profile">Select Type Profile:</Label>
          <RadioGroup defaultValue="user" name='type_profile'>
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
          <Input id="password" type="password" placeholder="Enter a password" required/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password Confirm</Label>
          <Input id="re_password" type="password" placeholder="Confirm a password" required/>
        </div>
        <Button type="submit" size="lg" className="w-full text-md rounded-full text-gray-200 font-bold bg-green-600">
          Sign up
        </Button>
      </div>
      <Separator className="my-8"/>
      <div className="space-y-2">
        <Button variant="outline" size="lg"
                className="w-full rounded-full bg-black text-md font-medium border-white/50">
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

      <Separator className="my-8"/>

      <div className="flex items-center justify-center space-x-2">
        <p className="text-sm text-white/70 font-normal">Already have an account?</p>
        <Link href={`/auth/login`} className="hover:text-green-500 underline text-sm text-white/90 font-medium">
          Log in here.
        </Link>
      </div>
    </section>
  )
}