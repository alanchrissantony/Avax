"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";
import "@/components/sidebar/sidebar.css";
import PlayerComponent from "@/components/player/page";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!authState.artist && !["/login", "/signup", "/password-reset"].includes(pathname)) {
      router.push("/login");
    }
  }, [authState.artist, pathname, router]);

  if (["/login", "/signup", "/password-reset"].includes(pathname)) {
    return <>{children}</>;
  }

  if (!authState.artist) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">
      {/* Navbar */}
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>

      {/* Sidebar */}
      <div className="sidebar hidden md:inline fixed top-16 left-0 h-full w-1/12 lg:w-1/6">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="mt-[4rem] ml-[0%] md:ml-[8%] lg:ml-[16.666%] lg:w-[83.333%]">
        {children}
        <PlayerComponent />
      </div>

      {/* Mobile Sidebar Placeholder */}
      <div className="md:hidden fixed bottom-0 w-full z-10"></div>
    </div>
  );
};

export default Layout;

