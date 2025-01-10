"use client"

import Sidebar from "@/components/sidebar/sidebar";
import { AppDispatch, RootState } from "@/reducer/store";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


export default function Home() {

  const router = useRouter()
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(()=>{
    if(!authState.user){
      router.push('/login')
    }
  },[authState.user, router])
  
  return (
    <div>
      { authState.user && (
        <Sidebar />
      )}
    </div >
  );
}
