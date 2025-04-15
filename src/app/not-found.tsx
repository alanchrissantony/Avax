"use client";

import {CircleAlert} from "lucide-react";
import MainSection from "@/components/general/main-section";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import ContentSection from "@/components/general/content-section";


export default function NotFound() {
  const router = useRouter();

  return (
    <MainSection bgColor="#131313">
      <ContentSection>
        <div className="flex min-h-[70dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <CircleAlert className="mx-auto h-14 w-14 text-white"/>
            <h1 className="mt-6 font-bold tracking-tight text-foreground text-4xl">
              Something went wrong
            </h1>
            <p className="mt-6 text-white/90 text-md font-medium">
              Try reloading the page
            </p>
            <div className="mt-4">
              <Button
                onClick={() => router.refresh()}
                className="uppercase rounded-full text-black text-lg font-semibold" size="lg"
              >
                Reload page
              </Button>
            </div>
          </div>
        </div>
      </ContentSection>
    </MainSection>
  )
}