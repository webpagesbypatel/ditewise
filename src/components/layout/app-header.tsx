"use client"

import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { NAV_ITEMS_MAIN, NAV_ITEMS_TOOLS, APP_NAME } from "@/lib/constants"
import Link from "next/link"
import { ChevronRight, Menu, Bell, Search, Sparkles } from "lucide-react"
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
      className="sticky top-0 z-30 flex h-16 sm:h-18 lg:h-20 items-center justify-between gap-3 sm:gap-6 lg:gap-8 nav-luxury px-4 sm:px-6 lg:px-8 transition-all duration-300"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Mobile menu trigger with luxury styling */}
      <motion.div 
        className="lg:hidden flex-shrink-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SidebarTrigger className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl border border-gray-200/60 bg-white/90 hover:bg-gray-50 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-luxury backdrop-blur-sm">
          <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </SidebarTrigger>
      </motion.div>
      
      {/* Luxury breadcrumb navigation */}
      <div className="flex items-center justify-center flex-1 min-w-0 px-3">
        <motion.nav 
          className="flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-xl rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 shadow-luxury border border-gray-200/50 max-w-full overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/dashboard" 
              className="text-gray-800 hover:text-primary transition-all duration-300 font-bold whitespace-nowrap flex-shrink-0 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-primary/8 hover:shadow-md text-sm sm:text-base lg:text-lg group"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold group-hover:rotate-12 transition-transform duration-300" />
                Dashboard
              </span>
            </Link>
          </motion.div>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index === 0 && pathSegments[0] !== 'dashboard' && (
                <>
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0 transition-transform duration-300" />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href={crumb.href} 
                      className={cn(
                        "truncate transition-all duration-300 whitespace-nowrap px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl hover:shadow-md font-bold text-sm sm:text-base lg:text-lg max-w-[140px] sm:max-w-none", 
                        index === breadcrumbs.length - 1 
                          ? "text-primary bg-gradient-to-r from-primary/12 to-gold/12 shadow-md border border-primary/20 backdrop-blur-sm" 
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
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0 transition-transform duration-300" />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href={crumb.href} 
                      className={cn(
                        "truncate transition-all duration-300 whitespace-nowrap px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl hover:shadow-md font-bold text-sm sm:text-base lg:text-lg max-w-[140px] sm:max-w-none", 
                        index === breadcrumbs.length - 1 
                          ? "text-primary bg-gradient-to-r from-primary/12 to-gold/12 shadow-md border border-primary/20 backdrop-blur-sm" 
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

      {/* Luxury action buttons */}
      <div className="hidden sm:flex items-center gap-3 lg:gap-4 flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-11 w-11 lg:h-12 lg:w-12 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-luxury backdrop-blur-sm border border-gray-200/50"
          >
            <Search className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600" />
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-11 w-11 lg:h-12 lg:w-12 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-luxury backdrop-blur-sm border border-gray-200/50 relative group"
          >
            <Bell className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600 group-hover:animate-pulse" />
            <motion.span 
              className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-rose-gold to-gold rounded-full text-[10px] text-white flex items-center justify-center font-bold shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              3
            </motion.span>
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
            className="h-11 w-11 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-luxury backdrop-blur-sm border border-gray-200/50 relative"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-rose-gold to-gold rounded-full"></span>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}