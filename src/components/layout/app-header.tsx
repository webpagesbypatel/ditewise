"use client"

import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { NAV_ITEMS_MAIN, NAV_ITEMS_TOOLS, APP_NAME } from "@/lib/constants"
import Link from "next/link"
import { ChevronRight, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const findLabel = (pathname: string) => {
  const allNavItems = [...NAV_ITEMS_MAIN, ...NAV_ITEMS_TOOLS];
  const activeItem = allNavItems.find(item => pathname.startsWith(item.href));
  return activeItem ? activeItem.label : APP_NAME;
}

export function AppHeader() {
  const pathname = usePathname();

  // Simple breadcrumb logic
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = findLabel(href);
    return { href, label: label === APP_NAME && segment !== 'dashboard' ? segment.charAt(0).toUpperCase() + segment.slice(1) : label };
  });

  return (
    <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center gap-3 sm:gap-4 border-b border-gray-200 bg-white/90 backdrop-blur-sm px-4 sm:px-6 shadow-sm">
      {/* Enhanced Mobile hamburger menu */}
      <div className="lg:hidden">
        <SidebarTrigger className="relative group hover:bg-primary/10 active:bg-primary/20 transition-all duration-300 h-11 w-11 rounded-xl border border-primary/20 shadow-sm hover:shadow-md bg-gradient-to-br from-white to-primary/5 hover:from-primary/5 hover:to-primary/10">
          {/* Custom menu icon with animation */}
          <div className="relative flex flex-col items-center justify-center w-5 h-5">
            <span className="block w-5 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:bg-primary/80 group-active:scale-110"></span>
            <span className="block w-4 h-0.5 bg-primary/70 rounded-full mt-1 transition-all duration-300 group-hover:bg-primary group-hover:w-5 group-active:scale-110"></span>
            <span className="block w-3 h-0.5 bg-primary/50 rounded-full mt-1 transition-all duration-300 group-hover:bg-primary group-hover:w-5 group-active:scale-110"></span>
          </div>
          
          {/* Tooltip for better UX */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
            Explore Menu
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
        </SidebarTrigger>
      </div>
      
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-1 sm:gap-2 text-sm overflow-x-auto hide-scrollbar flex-1 min-w-0">
        <Link 
          href="/dashboard" 
          className="text-gray-600 hover:text-primary transition-colors duration-300 font-medium whitespace-nowrap flex-shrink-0"
        >
          Dashboard
        </Link>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            {index === 0 && pathSegments[0] !== 'dashboard' && (
              <>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                <Link 
                  href={crumb.href} 
                  className={cn(
                    "truncate transition-colors duration-300 whitespace-nowrap", 
                    index === breadcrumbs.length - 1 
                      ? "text-primary font-semibold" 
                      : "text-gray-600 hover:text-primary"
                  )}
                >
                  {crumb.label}
                </Link>
              </>
            )}
            {index > 0 && (
              <>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                <Link 
                  href={crumb.href} 
                  className={cn(
                    "truncate transition-colors duration-300 whitespace-nowrap", 
                    index === breadcrumbs.length - 1 
                      ? "text-primary font-semibold" 
                      : "text-gray-600 hover:text-primary"
                  )}
                >
                  {crumb.label}
                </Link>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </header>
  )
}