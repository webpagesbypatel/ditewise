"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

const toastIcons = {
  default: Info,
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
}

const toastColors = {
  default: "bg-white border-gray-200 text-gray-900",
  success: "bg-green-50 border-green-200 text-green-900",
  error: "bg-red-50 border-red-200 text-red-900",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
}

export function EnhancedToaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.variant as keyof typeof toastIcons] || toastIcons.default
          const colorClass = toastColors[toast.variant as keyof typeof toastColors] || toastColors.default

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={cn(
                "relative flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm",
                colorClass
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <div className="font-semibold text-sm mb-1">{toast.title}</div>
                )}
                {toast.description && (
                  <div className="text-sm opacity-90">{toast.description}</div>
                )}
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}