"use client"

import Sidebar from "@/components/sidebar/sidebar";
import { RootState } from "@/reducer/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export default function Home() {

  const router = useRouter()
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log(authState);
    
    if(!authState.artist){
        router.push('/login')
    }
}, [])
  return (
    <div>
        <Sidebar/>
    </div >
  );
}