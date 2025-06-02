"use client";

import Link from "next/link";
import {Check, DownloadIcon, FileAudioIcon, Music2Icon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import ContentSection from "@/components/general/content-section";
import {useListSubscriptionQuery} from "@/lib/features/other/publicApiSlice";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


export default function Page() {
  const {
    data: subscriptions,
    isLoading: isLoadingS,
    isFetching: isFetchingS,
  } = useListSubscriptionQuery({})

  console.log(subscriptions)

  const load = isLoadingS || isFetchingS

  if (load) return <FullScreenSpinner/>

  return (
    <div className="flex flex-col min-h-[100dvh]text-white">
      <main className="flex-1">
        <section className="w-full py-14 bg-gradient-to-r from-pink-800/80 to-blue-900/80">
          <div className="container px-4 md:px-6 text-white">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Spotify Premium</h1>
                  <p className="max-w-[600px] md:text-xl text-white/70 font-semibold">
                    Enjoy ad-free music, offline listening, and high-quality audio.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 min-[400px]:flex-row">
                  <Button
                    className="bg-white text-black font-bold hover:bg-white hover:scale-105 transition duration-150"
                  >
                    Get Premium
                  </Button>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center hover:scale-105 duration-150 transition rounded-full bg-transparent border border-white text-white px-8 text-sm font-semibold shadow-sm hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContentSection className="mx-4 sm:mx-10 md:mx-20 lg:mx-30 xl:mx-40">
          <section className="w-full py-10">
            <div className="container px-4 md:px-6 dark:text-white">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Upgrade to Spotify Premium</h2>
                  <p
                    className="max-w-[900px] text-white/60 font-semibold md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                    Unlock the full Spotify experience with these premium features.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li className="flex items-center gap-4">
                      <div className="rounded-full bg-[#1DB954] p-2 text-white">
                        <Music2Icon className="h-5 w-5"/>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Ad-free listening</h3>
                        <p className="text-muted-foreground dark:text-white/80">
                          Enjoy your music without interruptions.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="rounded-full bg-[#1DB954] p-2 text-white">
                        <DownloadIcon className="h-5 w-5"/>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Offline mode</h3>
                        <p className="text-muted-foreground dark:text-white/80">
                          Save your favorite songs and listen offline.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="rounded-full bg-[#1DB954] p-2 text-white">
                        <FileAudioIcon className="h-5 w-5"/>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">High-quality audio</h3>
                        <p className="text-muted-foreground dark:text-white/80">
                          Enjoy your music in crystal-clear sound.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full">
            <div className="container px-4 md:px-6 text-white">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Spotify Premium Plans</h2>
                  <p
                    className="max-w-[900px] text-white/60 font-semibold md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                    Choose the plan that`s right for you and start enjoying the full Spotify experience.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center py-12 xl:grid-cols-2 gap-8">

                {subscriptions?.map(subscription => (
                  <Card key={subscription.id}
                        className="bg-[#252525] border-none rounded-lg min-h-[21rem] p-2 text-[#1DB954] shadow-xl">
                    <CardHeader>
                      <CardTitle>{subscription.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end gap-2 my-4">
                        <span className="text-4xl font-bold">${subscription.price}</span>
                        <span className="text-sm text-muted-foreground dark:text-white/80">/month</span>
                      </div>
                      <ul className="space-y-2 text-muted-foreground dark:text-white/80">
                        {subscription.feature.map((feature) => (
                          <li key={feature.id} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-[#1DB954]"/>
                            {feature.name}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#1DB954] text-white px-8 text-sm font-medium shadow transition-colors hover:bg-[#1DB954]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      >
                        Get {subscription.name}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                {/*<Card className="bg-[#252525] border-none rounded-lg p-2 text-[#1DB954] shadow-xl">*/}
                {/*  <CardHeader>*/}
                {/*    <CardTitle>Student</CardTitle>*/}
                {/*  </CardHeader>*/}
                {/*  <CardContent>*/}
                {/*    <div className="flex items-end gap-2 my-4">*/}
                {/*      <span className="text-4xl font-bold">2.49</span>*/}
                {/*      <span className="text-sm text-muted-foreground dark:text-white/80">/month</span>*/}
                {/*    </div>*/}
                {/*    <ul className="space-y-2 text-muted-foreground dark:text-white/80">*/}
                {/*      <li className="flex items-center gap-2">*/}
                {/*        <CheckIcon className="h-5 w-5 text-[#1DB954]"/>*/}
                {/*        Ad-free listening*/}
                {/*      </li>*/}
                {/*      <li className="flex items-center gap-2">*/}
                {/*        <CheckIcon className="h-5 w-5 text-[#1DB954]"/>*/}
                {/*        Offline mode*/}
                {/*      </li>*/}
                {/*      <li className="flex items-center gap-2">*/}
                {/*        <CheckIcon className="h-5 w-5 text-[#1DB954]"/>*/}
                {/*        High-quality audio*/}
                {/*      </li>*/}
                {/*    </ul>*/}
                {/*  </CardContent>*/}
                {/*  <CardFooter>*/}
                {/*    <Button*/}
                {/*      className="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#1DB954] text-white px-8 text-sm font-medium shadow transition-colors hover:bg-[#1DB954]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"*/}
                {/*    >*/}
                {/*      Get Student*/}
                {/*    </Button>*/}
                {/*  </CardFooter>*/}
                {/*</Card>*/}
                {/*<Card className="bg-[#252525] border-none rounded-lg p-2 text-[#1DB954] shadow-xl">*/}
                {/*  <CardHeader>*/}
                {/*    <CardTitle>Duo</CardTitle>*/}
                {/*  </CardHeader>*/}
                {/*  <CardContent>*/}
                {/*    <div className="flex items-end gap-2 my-4">*/}
                {/*      <span className="text-4xl font-bold">$13.99</span>*/}
                {/*      <span className="text-sm text-muted-foreground dark:text-white/80">/month</span>*/}
                {/*    </div>*/}
                {/*    <ul className="space-y-2 text-muted-foreground dark:text-white/80">*/}
                {/*      <li className="flex items-center gap-2">*/}
                {/*        <CheckIcon className="h-5 w-5 text-[#1DB954]"/>*/}
                {/*        Ad-free listening*/}
                {/*      </li>*/}
                {/*      <li className="flex items-center gap-2">*/}
                {/*        <CheckIcon className="h-5 w-5 text-[#1DB954]"/>*/}
                {/*        Offline mode*/}
                {/*      </li>*/}
                {/*      <li className="flex items-center gap-2">*/}
                {/*        <CheckIcon className="h-5 w-5 text-[#1DB954]"/>*/}
                {/*        High-quality audio*/}
                {/*      </li>*/}
                {/*      <li className="flex items-center gap-2">*/}
                {/*        <CheckIcon className="h-5 w-5 text-[#1DB954]"/>*/}
                {/*        2 Premium accounts*/}
                {/*      </li>*/}
                {/*    </ul>*/}
                {/*  </CardContent>*/}
                {/*  <CardFooter>*/}
                {/*    <Button*/}
                {/*      className="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#1DB954] text-white px-8 text-sm font-medium shadow transition-colors hover:bg-[#1DB954]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"*/}
                {/*    >*/}
                {/*      Get Duo*/}
                {/*    </Button>*/}
                {/*  </CardFooter>*/}
                {/*</Card>*/}
                {/*<Card className="bg-[#252525] border-none rounded-lg p-2 text-[#1DB954] shadow-xl">*/}
                {/*  <CardHeader>*/}
                {/*    <CardTitle>Family</CardTitle>*/}
                {/*  </CardHeader>*/}
                {/*  <CardContent>*/}
                {/*    <div className="flex items-end gap-2 my-4">*/}
                {/*      <span className="text-4xl font-bold">$15.99</span>*/}
                {/*      <span className="text-sm text-muted-foreground dark:text-white/80">/month</span>*/}
                {/*    </div>*/}
                {/*    <ul className="space-y-2 text-muted-foreground dark:text-white/80">*/}
                {/*      <li className="flex items-center gap-2">*/}
                {/*        <CheckIcon className="h-5 w-5 text-[#1DB954]"/>*/}
                {/*        Ad-free listening*/}
                {/*      </li>*/}
                {/*      <li className="flex items-center gap-2">*/}
                {/*        <CheckIcon className="h-5 w-5 text-[#1DB954]"/>*/}
                {/*        Offline mode*/}
                {/*      </li>*/}
                {/*      <li className="flex items-center gap-2">*/}
                {/*        <CheckIcon className="h-5 w-5 text-[#1DB954]"/>*/}
                {/*        High-quality audio*/}
                {/*      </li>*/}
                {/*      <li className="flex items-center gap-2">*/}
                {/*        <CheckIcon className="h-5 w-5 text-[#1DB954]"/>*/}
                {/*        6 Premium accounts*/}
                {/*      </li>*/}
                {/*    </ul>*/}
                {/*  </CardContent>*/}
                {/*  <CardFooter>*/}
                {/*    <Button*/}
                {/*      className="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#1DB954] text-white px-8 text-sm font-medium shadow transition-colors hover:bg-[#1DB954]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"*/}
                {/*    >*/}
                {/*      Get Family*/}
                {/*    </Button>*/}
                {/*  </CardFooter>*/}
                {/*</Card>*/}
              </div>
            </div>
          </section>
        </ContentSection>
      </main>
    </div>
  )
}