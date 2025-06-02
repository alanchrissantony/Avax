import {CircleAlert} from "lucide-react";
import React from "react";


export default function ErrorField({message}: { message?: string }) {
  return (
    <span className='flex items-center text-destructive font-normal text-sm' style={{ opacity: message ? 1 : 0 }}>
      {message}
      <CircleAlert className="ml-2 h-5 w-5 text-destructive"/>
    </span>
  )
}