import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-xl border-2 border-gray-200 bg-white/90 px-6 py-4 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg md:h-12 md:py-3 md:text-base",
          className
        )}
        ref={ref}
        suppressHydrationWarning={true}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }