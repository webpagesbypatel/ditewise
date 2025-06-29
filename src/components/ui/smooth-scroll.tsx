"use client"

import { useEffect } from "react"

export function SmoothScroll() {
  useEffect(() => {
    // Enable smooth scrolling for the entire document
    document.documentElement.style.scrollBehavior = "smooth"
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return null
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}