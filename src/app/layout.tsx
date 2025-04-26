"use client";

import {Inter} from "next/font/google";
import "./globals.css";
import ReduxStoreProvider from "@/providers/ReduxStoreProvider";
import {cn} from "@/lib/utils"
import {ThemeProvider} from "@/providers/ThemeProvider";
import TrackPlayerProvider from "@/providers/TrackPlayerProvider";
import PreviewPlayer from "@/components/tracks/player/PreviewPlayer";
import Setup from "@/components/utils/Setup";
import {usePathname} from "next/navigation";
import {accountAuthUrl} from "@/utils/consts";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAccountAuthPage = pathname.startsWith(accountAuthUrl);


  return (
    <html lang="en" className="scroll-auto" suppressHydrationWarning>
    <body className={cn(
      "min-h-screen bg-background font-sans antialiased",
      fontSans.variable
    )}
    >


    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ReduxStoreProvider>
        <Setup/>

        <TrackPlayerProvider>
          <main>
            {children}
            {!isAccountAuthPage && <PreviewPlayer/>}
          </main>
        </TrackPlayerProvider>
      </ReduxStoreProvider>
    </ThemeProvider>

    </body>
    </html>
  );
}
