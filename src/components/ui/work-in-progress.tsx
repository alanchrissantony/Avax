"use client";

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";


export default function WorkInProgress() {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center w-full min-h-[300px]'>
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tighter">Still Under Development</h1>
          <p
            className="max-w-[500px] text-white/60 text-sm/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
            We are still working on this page. Please check back later for updates.
          </p>
        </div>
        <Button
          size="lg"
          className="bg-white text-black text-base font-semibold hover:scale-105 transition duration-150"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}