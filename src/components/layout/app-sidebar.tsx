"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarGroup,
  useSidebar,
} from "@/components/ui/sidebar"
import { NAV_ITEMS_MAIN, NAV_ITEMS_TOOLS, NAV_ITEMS_BOTTOM, APP_NAME, APP_ICON, type NavItem } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { UserProfileButton } from "./user-profile-button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

function AppLogo() {
  const { state } = useSidebar();
  const AppIcon = APP_ICON;
  return (
    <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group">
      <motion.div 
        className="p-3 rounded-xl bg-gradient-to-br from-gold to-rose-gold shadow-luxury"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <AppIcon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
      </motion.div>
      {state === 'expanded' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-xl sm:text-2xl font-bold text-gold font-serif tracking-wide">
            {APP_NAME}
          </h1>
          <p className="text-xs text-gold/70 font-light">Premium Nutrition</p>
        </motion.div>
      )}
    </Link>
  )
}

interface NavLinkProps {
  item: NavItem;
  index: number;
}

function NavLink({ item, index }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = item.match ? item.match(pathname) : pathname.startsWith(item.href)

  return (
    <SidebarMenuItem>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ x: 4 }}
      >
        <SidebarMenuButton
          asChild
          isActive={isActive}
          tooltip={{ children: item.label, className: "capitalize bg-gray-900 text-gold border border-gold/20" }}
          className={cn(
            "justify-start rounded-xl transition-all duration-300 hover:shadow-gold/20 hover:shadow-lg min-h-[52px] px-4 py-3 group relative overflow-hidden",
            isActive && "bg-gradient-to-r from-gold/20 to-rose-gold/20 border border-gold/30 shadow-gold/30 shadow-lg backdrop-blur-sm"
          )}
        >
          <Link href={item.href} className="flex items-center gap-4 w-full">
            <motion.div 
              className={cn(
                "p-2 rounded-lg transition-all duration-300 flex-shrink-0",
                isActive 
                  ? "bg-gold/20 text-gold shadow-gold/30 shadow-md" 
                  : "text-gold/70 hover:text-gold hover:bg-gold/10"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="h-5 w-5" />
            </motion.div>
            <span className={cn(
              "font-medium transition-all duration-300 text-base tracking-wide",
              isActive 
                ? "text-gold font-semibold" 
                : "text-gold/80 hover:text-gold group-hover:translate-x-1"
            )}>
              {item.label}
            </span>
            {isActive && (
              <motion.div
                className="absolute right-2 w-2 h-2 bg-gold rounded-full shadow-gold/50 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        </SidebarMenuButton>
      </motion.div>
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  return (
    <Sidebar 
      variant="sidebar" 
      collapsible="icon" 
      side="left" 
      className="border-r border-gray-700/50 bg-gradient-to-b from-primary via-primary/95 to-secondary shadow-luxury-hover backdrop-blur-xl"
    >
      <SidebarHeader className="flex items-center justify-between p-4 sm:p-6 border-b border-gold/20">
        <AppLogo />
      </SidebarHeader>
      
      <SidebarContent asChild>
        <ScrollArea className="h-full hide-scrollbar">
          <div className="p-3">
            <SidebarMenu className="gap-2">
              {NAV_ITEMS_MAIN.map((item, index) => (
                <NavLink key={item.href} item={item} index={index} />
              ))}
            </SidebarMenu>
          </div>
          
          <SidebarSeparator className="mx-6 my-4 bg-gold/20" />
          
          <SidebarGroup>
            <SidebarGroupLabel className="px-6 py-3 text-sm font-semibold text-gold/70 uppercase tracking-wider font-serif">
              AI-Powered Tools
            </SidebarGroupLabel>
            <div className="p-3">
              <SidebarMenu className="gap-2">
                {NAV_ITEMS_TOOLS.map((item, index) => (
                  <NavLink key={item.href} item={item} index={index + NAV_ITEMS_MAIN.length} />
                ))}
              </SidebarMenu>
            </div>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      
      <SidebarFooter className="flex flex-col gap-3 p-4 sm:p-6 border-t border-gold/20">
        <SidebarMenu>
          {NAV_ITEMS_BOTTOM.map((item, index) => (
            <NavLink key={item.href} item={item} index={index + NAV_ITEMS_MAIN.length + NAV_ITEMS_TOOLS.length} />
          ))}
        </SidebarMenu>
        
        <motion.div 
          className="flex items-center justify-between pt-3 border-t border-gold/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ThemeToggle />
          <UserProfileButton />
        </motion.div>
        
        <motion.div 
          className="text-center pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-xs text-gold/50 font-light">Premium Experience</p>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  )
}