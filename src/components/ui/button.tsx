import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-luxury-hover hover:-translate-y-1 shadow-luxury",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-luxury-hover hover:-translate-y-1 shadow-md",
        outline:
          "border-2 border-primary/20 bg-white/90 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/40 hover:shadow-md",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 hover:shadow-md",
        ghost: "hover:bg-primary/10 hover:text-primary hover:shadow-sm",
        link: "text-primary underline-offset-4 hover:underline font-medium",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-xl px-8 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        suppressHydrationWarning={true}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }