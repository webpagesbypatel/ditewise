import { cn } from "@/lib/utils"

interface SkeletonLoaderProps {
  className?: string
  children?: React.ReactNode
}

export function SkeletonLoader({ className, children }: SkeletonLoaderProps) {
  return (
    <div className={cn("animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded-lg", className)}>
      {children}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="card-responsive animate-pulse">
      <div className="touch-spacing space-y-4">
        <div className="flex items-center space-x-4">
          <SkeletonLoader className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <SkeletonLoader className="h-4 w-3/4" />
            <SkeletonLoader className="h-3 w-1/2" />
          </div>
        </div>
        <SkeletonLoader className="h-32 w-full" />
        <div className="space-y-2">
          <SkeletonLoader className="h-3 w-full" />
          <SkeletonLoader className="h-3 w-4/5" />
        </div>
      </div>
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonLoader className="h-4 w-24" />
          <SkeletonLoader className="h-12 w-full" />
          <SkeletonLoader className="h-3 w-3/4" />
        </div>
      ))}
      <SkeletonLoader className="h-12 w-32" />
    </div>
  )
}