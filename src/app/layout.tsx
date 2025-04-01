import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import ReduxStoreProvider from "@/providers/ReduxStoreProvider";
import {cn} from "@/lib/utils"
import {ThemeProvider} from "@/providers/ThemeProvider";
import Header from "@/components/general/Header";
import {Sidebar} from "@/components/general/Siderbar";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Avax | Home",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
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

        <div className="grid grid-cols-10">
          <Sidebar/>
          <div className="flex flex-col h-[87vh] col-span-8 overflow-auto rounded-lg bg-[#131313] mt-2 mr-2">
            <Header/>
            <main className="mx-4 my-4">{children}</main>
          </div>
        </div>
        {/*<PreviewPlayer/>*/}

      </ReduxStoreProvider>
    </ThemeProvider>

    </body>
    </html>
  );
}
