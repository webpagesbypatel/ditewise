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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-white/95 backdrop-blur-md px-6 shadow-sm">
      {/* Enhanced 3-dot menu with perfect alignment and scaling */}
      <div className="lg:hidden flex-shrink-0">
        <SidebarTrigger asChild>
          <button className="relative group overflow-hidden h-12 w-12 rounded-2xl border-2 border-primary/20 shadow-md hover:shadow-lg bg-gradient-to-br from-white via-primary/5 to-primary/10 hover:from-primary/10 hover:via-primary/15 hover:to-primary/20 active:from-primary/20 active:via-primary/25 active:to-primary/30 transition-all duration-300 ease-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2">
            
            {/* Perfectly centered animated background gradient */}
            <div className="absolute inset-1 bg-gradient-to-r from-primary/10 via-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl blur-sm group-active:opacity-75"></div>
            
            {/* Centered ripple effect container */}
            <div className="absolute inset-1 rounded-xl overflow-hidden flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-yellow-400/20 scale-0 group-active:scale-150 transition-transform duration-200 ease-out rounded-full opacity-60"></div>
            </div>
            
            {/* Perfectly centered 3-dot icon with proper spacing */}
            <div className="relative flex flex-col items-center justify-center w-full h-full gap-1 z-10">
              <span className="block w-1.5 h-1.5 bg-gradient-to-r from-primary to-yellow-500 rounded-full transition-all duration-200 ease-out group-hover:w-2 group-hover:h-2 group-hover:shadow-sm group-hover:shadow-primary/20 group-active:scale-110 transform group-hover:rotate-6"></span>
              <span className="block w-1.5 h-1.5 bg-gradient-to-r from-primary to-yellow-500 rounded-full transition-all duration-200 ease-out delay-50 group-hover:w-2 group-hover:h-2 group-hover:shadow-sm group-hover:shadow-primary/20 group-active:scale-110"></span>
              <span className="block w-1.5 h-1.5 bg-gradient-to-r from-primary to-yellow-500 rounded-full transition-all duration-200 ease-out delay-100 group-hover:w-2 group-hover:h-2 group-hover:shadow-sm group-hover:shadow-primary/20 group-active:scale-110 transform group-hover:-rotate-6"></span>
            </div>
            
            {/* Centered tooltip */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
              Menu
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45"></div>
            </div>
            
            {/* Centered ambient glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-60 transition-all duration-300 blur-md -z-10 scale-110"></div>
            
            {/* Centered focus pulse animation */}
            <div className="absolute inset-2 rounded-xl bg-primary/15 scale-100 group-focus:animate-ping opacity-0 group-focus:opacity-100 duration-75"></div>
          </button>
        </SidebarTrigger>
      </div>
      
      {/* Perfectly centered breadcrumb navigation */}
      <div className="flex items-center justify-center flex-1 min-w-0">
        <nav className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm border border-gray-200/60 max-w-2xl">
          <Link 
            href="/dashboard" 
            className="text-gray-800 hover:text-primary transition-all duration-200 font-bold whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-full hover:bg-primary/8 hover:shadow-sm text-base"
          >
            Dashboard
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index === 0 && pathSegments[0] !== 'dashboard' && (
                <>
                  <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-200" />
                  <Link 
                    href={crumb.href} 
                    className={cn(
                      "truncate transition-all duration-200 whitespace-nowrap px-4 py-2 rounded-full hover:shadow-sm font-bold text-base", 
                      index === breadcrumbs.length - 1 
                        ? "text-primary bg-gradient-to-r from-primary/12 to-yellow-500/12 shadow-sm border border-primary/15" 
                        : "text-gray-800 hover:text-primary hover:bg-primary/8"
                    )}
                  >
                    {crumb.label}
                  </Link>
                </>
              )}
              {index > 0 && (
                <>
                  <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-200" />
                  <Link 
                    href={crumb.href} 
                    className={cn(
                      "truncate transition-all duration-200 whitespace-nowrap px-4 py-2 rounded-full hover:shadow-sm font-bold text-base", 
                      index === breadcrumbs.length - 1 
                        ? "text-primary bg-gradient-to-r from-primary/12 to-yellow-500/12 shadow-sm border border-primary/15" 
                        : "text-gray-800 hover:text-primary hover:bg-primary/8"
                    )}
                  >
                    {crumb.label}
                  </Link>
                </>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Spacer for perfect balance */}
      <div className="hidden lg:block w-12 flex-shrink-0"></div>
    </header>
  )
}