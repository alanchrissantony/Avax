"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";
import "@/components/sidebar/sidebar.css";
import Taskbar from "@/components/sidebar/taskbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!authState.admin && !["/login"].includes(pathname)) {
      router.push("/login");
    }
  }, [authState.admin, pathname, router]);

  if (["/login"].includes(pathname)) {
    return <>{children}</>;
  }

  if (!authState.admin) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">

      {/* Sidebar */}
      <div className="sidebar hidden md:inline fixed top-0 left-0 h-full w-1/12 lg:w-1/6">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-[0%] md:ml-[8%] lg:ml-[16.666%] lg:w-[83.333%] p-4">

        {/* Navbar */}
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>

        {children}
      </div>

      {/* Mobile Sidebar Placeholder */}
      <div className="md:hidden fixed bottom-0 w-full z-10">
        <Taskbar />
      </div>

    </div>
  );
};

export default Layout;

