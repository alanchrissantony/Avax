"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }


export const OrSeparator = ({className}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn("relative flex items-center justify-center text-sm text-muted-foreground before:content-[''] after:content-[''] before:flex-1 after:flex-1 before:h-px after:h-px before:bg-[#4c4c52] after:bg-[#4c4c52] before:mr-4 after:ml-4", className)}>
      or
    </span>
  )
}