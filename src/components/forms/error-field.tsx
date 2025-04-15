import {CircleAlert} from "lucide-react";
import React from "react";


export default function ErrorField({message}: { message?: string }) {
  return (
    <span className='flex items-center text-white font-normal text-sm'>
      <CircleAlert className="mr-2 h-5 w-5 text-red-800"/>
      {message}
    </span>
  )
}