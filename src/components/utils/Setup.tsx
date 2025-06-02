'use client';

import useVerify from "@/hooks/useVerify";
import { Toaster } from "../ui/toster";

export default function Setup() {
  useVerify();

  return <Toaster className="bg-black" />
}