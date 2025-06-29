"use client"

import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { NAV_ITEMS_MAIN, NAV_ITEMS_TOOLS, APP_NAME } from "@/lib/constants"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
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
    <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center gap-3 sm:gap-4 border-b border-gray-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 shadow-sm">
      {/* Premium Enhanced 3-dot menu with advanced animations */}
      <div className="lg:hidden">
        <SidebarTrigger asChild>
          <button className="relative group overflow-hidden h-12 w-12 rounded-2xl border-2 border-primary/30 shadow-lg hover:shadow-xl bg-gradient-to-br from-white via-primary/5 to-primary/10 hover:from-primary/10 hover:via-primary/15 hover:to-primary/20 active:from-primary/20 active:via-primary/25 active:to-primary/30 transition-all duration-500 ease-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:ring-offset-2">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl blur-sm group-active:opacity-75"></div>
            
            {/* Ripple effect container */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-yellow-400/30 scale-0 group-active:scale-150 transition-transform duration-300 ease-out rounded-full opacity-50"></div>
            </div>
            
            {/* Enhanced 3-dot icon with staggered animations */}
            <div className="relative flex flex-col items-center justify-center w-6 h-6 gap-1.5 z-10">
              <span className="block w-2 h-2 bg-gradient-to-r from-primary to-yellow-500 rounded-full transition-all duration-300 ease-out group-hover:w-2.5 group-hover:h-2.5 group-hover:shadow-lg group-hover:shadow-primary/30 group-active:scale-125 transform group-hover:rotate-12 group-hover:-translate-x-0.5"></span>
              <span className="block w-2 h-2 bg-gradient-to-r from-primary to-yellow-500 rounded-full transition-all duration-300 ease-out delay-75 group-hover:w-2.5 group-hover:h-2.5 group-hover:shadow-lg group-hover:shadow-primary/30 group-active:scale-125 transform group-hover:scale-110"></span>
              <span className="block w-2 h-2 bg-gradient-to-r from-primary to-yellow-500 rounded-full transition-all duration-300 ease-out delay-150 group-hover:w-2.5 group-hover:h-2.5 group-hover:shadow-lg group-hover:shadow-primary/30 group-active:scale-125 transform group-hover:-rotate-12 group-hover:translate-x-0.5"></span>
            </div>
            
            {/* Premium floating tooltip */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-2xl border border-gray-700/50">
              Open Menu
              <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900/95 rotate-45 border-l border-t border-gray-700/50"></div>
            </div>
            
            {/* Ambient glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/40 via-yellow-400/40 to-orange-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10 group-active:opacity-75 scale-150"></div>
            
            {/* Border highlight animation */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary via-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10">
              <div className="absolute inset-0.5 rounded-2xl bg-white"></div>
            </div>
            
            {/* Pulse animation on focus */}
            <div className="absolute inset-0 rounded-2xl bg-primary/20 scale-100 group-focus:animate-ping opacity-0 group-focus:opacity-75"></div>
          </button>
        </SidebarTrigger>
      </div>
      
      {/* Enhanced Centered Breadcrumb navigation */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 text-sm overflow-x-auto hide-scrollbar flex-1 min-w-0">
        <div className="flex items-center gap-1 sm:gap-2 mx-auto bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-200/50">
          <Link 
            href="/dashboard" 
            className="text-gray-600 hover:text-primary transition-all duration-300 font-medium whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:shadow-sm"
          >
            Dashboard
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index === 0 && pathSegments[0] !== 'dashboard' && (
                <>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                  <Link 
                    href={crumb.href} 
                    className={cn(
                      "truncate transition-all duration-300 whitespace-nowrap px-3 py-1.5 rounded-full hover:shadow-sm", 
                      index === breadcrumbs.length - 1 
                        ? "text-primary font-semibold bg-gradient-to-r from-primary/15 to-yellow-500/15 shadow-sm border border-primary/20" 
                        : "text-gray-600 hover:text-primary hover:bg-primary/10"
                    )}
                  >
                    {crumb.label}
                  </Link>
                </>
              )}
              {index > 0 && (
                <>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                  <Link 
                    href={crumb.href} 
                    className={cn(
                      "truncate transition-all duration-300 whitespace-nowrap px-3 py-1.5 rounded-full hover:shadow-sm", 
                      index === breadcrumbs.length - 1 
                        ? "text-primary font-semibold bg-gradient-to-r from-primary/15 to-yellow-500/15 shadow-sm border border-primary/20" 
                        : "text-gray-600 hover:text-primary hover:bg-primary/10"
                    )}
                  >
                    {crumb.label}
                  </Link>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </header>
  )
}