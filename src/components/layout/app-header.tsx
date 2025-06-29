"use client"

import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { NAV_ITEMS_MAIN, NAV_ITEMS_TOOLS, APP_NAME } from "@/lib/constants"
import Link from "next/link"
import { ChevronRight, Menu, Bell, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const findLabel = (pathname: string) => {
  const allNavItems = [...NAV_ITEMS_MAIN, ...NAV_ITEMS_TOOLS];
  const activeItem = allNavItems.find(item => pathname.startsWith(item.href));
  return activeItem ? activeItem.label : APP_NAME;
}

export function AppHeader() {
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = findLabel(href);
    return { href, label: label === APP_NAME && segment !== 'dashboard' ? segment.charAt(0).toUpperCase() + segment.slice(1) : label };
  });

  return (
    <motion.header 
      className="sticky top-0 z-30 flex h-14 sm:h-16 lg:h-18 items-center justify-between gap-2 sm:gap-4 lg:gap-6 border-b border-gray-200/80 bg-white/95 backdrop-blur-xl px-3 sm:px-4 lg:px-6 shadow-sm transition-all duration-300"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile menu trigger */}
      <motion.div 
        className="lg:hidden flex-shrink-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SidebarTrigger className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-gray-200/60 bg-white/90 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
          <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
        </SidebarTrigger>
      </motion.div>
      
      {/* Breadcrumb navigation - Enhanced for mobile */}
      <div className="flex items-center justify-center flex-1 min-w-0 px-2">
        <motion.nav 
          className="flex items-center gap-1 sm:gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 shadow-sm border border-gray-200/60 max-w-full overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/dashboard" 
              className="text-gray-800 hover:text-primary transition-all duration-200 font-bold whitespace-nowrap flex-shrink-0 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full hover:bg-primary/8 hover:shadow-sm text-xs sm:text-sm lg:text-base"
            >
              Dashboard
            </Link>
          </motion.div>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index === 0 && pathSegments[0] !== 'dashboard' && (
                <>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 transition-transform duration-200" />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href={crumb.href} 
                      className={cn(
                        "truncate transition-all duration-200 whitespace-nowrap px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full hover:shadow-sm font-bold text-xs sm:text-sm lg:text-base max-w-[120px] sm:max-w-none", 
                        index === breadcrumbs.length - 1 
                          ? "text-primary bg-gradient-to-r from-primary/12 to-yellow-500/12 shadow-sm border border-primary/15" 
                          : "text-gray-800 hover:text-primary hover:bg-primary/8"
                      )}
                    >
                      {crumb.label}
                    </Link>
                  </motion.div>
                </>
              )}
              {index > 0 && (
                <>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0 transition-transform duration-200" />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href={crumb.href} 
                      className={cn(
                        "truncate transition-all duration-200 whitespace-nowrap px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full hover:shadow-sm font-bold text-xs sm:text-sm lg:text-base max-w-[120px] sm:max-w-none", 
                        index === breadcrumbs.length - 1 
                          ? "text-primary bg-gradient-to-r from-primary/12 to-yellow-500/12 shadow-sm border border-primary/15" 
                          : "text-gray-800 hover:text-primary hover:bg-primary/8"
                      )}
                    >
                      {crumb.label}
                    </Link>
                  </motion.div>
                </>
              )}
            </React.Fragment>
          ))}
        </motion.nav>
      </div>

      {/* Action buttons - Enhanced for mobile */}
      <div className="hidden sm:flex items-center gap-2 lg:gap-3 flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 lg:h-10 lg:w-10 rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            <Search className="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" />
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 lg:h-10 lg:w-10 rounded-xl hover:bg-gray-100 transition-all duration-200 relative"
          >
            <Bell className="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>
        </motion.div>
      </div>

      {/* Mobile action button */}
      <div className="sm:hidden flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-xl hover:bg-gray-100 transition-all duration-200 relative"
          >
            <Bell className="h-4 w-4 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full"></span>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}