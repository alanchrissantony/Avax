import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {loginUrl} from "@/utils/consts";
import RegisterForm from "@/components/forms/register-form";


export default function Page() {
  return (
    <section>
      <div className="space-y-4 text-center mb-10">
        <h1 className="text-5xl font-bold">Sign up to start listening</h1>
      </div>

      <RegisterForm/>

      <Separator className="my-8"/>

      <div className="flex items-center justify-center space-x-2">
        <p className="text-sm text-white/70 font-normal">Already have an account?</p>
        <Link href={loginUrl} className="hover:text-green-500 underline text-sm text-white/90 font-medium">
          Log in here.
        </Link>
      </div>
    </section>
  )
}