"use client"

import * as React from "react"
import { Palette } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
      <Palette className="h-[1.2rem] w-[1.2rem] text-primary" />
      <span className="sr-only">Light Mode Active</span>
    </Button>
  )
}