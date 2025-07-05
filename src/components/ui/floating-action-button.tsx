"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface FloatingActionButtonProps {
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
  label?: string
}

export function FloatingActionButton({ 
  onClick, 
  className, 
  icon = <Plus className="h-6 w-6" />,
  label = "Add"
}: FloatingActionButtonProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Button
        onClick={onClick}
        size="lg"
        className={cn(
          "fab-luxury h-16 w-16 rounded-full shadow-luxury hover:shadow-luxury-hover text-white border-0 transition-all duration-300",
          className
        )}
      >
        {icon}
        <span className="sr-only">{label}</span>
      </Button>
    </motion.div>
  )
}