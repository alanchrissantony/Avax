"use client"

import Sidebar from "@/components/sidebar/sidebar";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export default function Home() {

  const router = useRouter()
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {

    if (!authState.user) {
      router.push('/login')
    }
  }, [authState.user, router])

  
  return (
    <>
      {authState.user && (
        <div className="grid grid-rows-[auto_1fr] h-screen">

          <div className="sidebar hidden md:inline fixed top-0 left-0 h-full w-1/12 lg:w-1/6">
            <Sidebar />
          </div>

          <div className="md:hidden fixed bottom-0 w-full z-10">
            
          </div>


          <div className="ml-[0%] md:ml-[8%] lg:ml-[16.666%] lg:w-[83.333%]">

            
          </div>
        </div>
      )}
    </>
  );
}
