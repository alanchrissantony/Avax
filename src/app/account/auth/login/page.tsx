import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {passwordResetUrl, signupUrl} from "@/utils/consts";
import LoginForm from "@/components/forms/login-form";


export default function Page() {
  return (
    <section className="space-y-8">
      <div className="space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold">Log in to Avax</h1>
      </div>

      <LoginForm/>

      <div className="space-y-2 text-center">
        <Link
          href={passwordResetUrl}
          className="hover:text-green-500 underline text-sm text-white/90 font-medium"
        >
          Forgot your password?
        </Link>
      </div>

      <Separator className="my-8"/>

      <div className="flex items-center justify-center space-x-2">
        <p className="text-sm text-white/70 font-normal">Don`t have an account?</p>
        <Link href={signupUrl} className="hover:text-green-500 underline text-sm text-white/90 font-medium">
          Sign up for Avax
        </Link>
      </div>
    </section>
  )
}