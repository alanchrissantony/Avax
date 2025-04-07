import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import ReduxStoreProvider from "@/providers/ReduxStoreProvider";
import {cn} from "@/lib/utils"
import {ThemeProvider} from "@/providers/ThemeProvider";
import Header from "@/components/general/Header";
import {Sidebar} from "@/components/general/Siderbar";
import FooterLogin from "@/components/general/FooterLogin";
import TrackPlayerProvider from "@/providers/TrackPlayerProvider";
import PreviewPlayer from "@/components/tracks/PreviewPlayer";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Avax | Home",
};

export default function HomeLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <div className="grid grid-cols-10">
        <Sidebar/>
        <div
          className="flex flex-col h-[86vh] col-span-8 overflow-auto rounded-lg bg-gradient-to-b from-[#202020] via-[#131313] to-[#131313] mt-2 mr-2">
          <Header/>
          <main className="mx-6 my-6">{children}</main>
        </div>
      </div>
      <PreviewPlayer/>
    </>
  )
}
