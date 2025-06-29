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

function AppLogo() {
  const { state } = useSidebar();
  const AppIcon = APP_ICON;
  return (
    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors duration-300">
      <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-yellow-500 shadow-md">
        <AppIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </div>
      {state === 'expanded' && <h1 className="text-lg sm:text-xl font-bold text-gradient">{APP_NAME}</h1>}
    </Link>
  )
}

interface NavLinkProps {
  item: NavItem;
}

function NavLink({ item }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = item.match ? item.match(pathname) : pathname.startsWith(item.href)

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={{ children: item.label, className: "capitalize" }}
        className={cn(
          "justify-start rounded-lg transition-all duration-300 hover:shadow-sm min-h-[44px] px-3 py-2",
          isActive && "bg-gradient-to-r from-primary/10 to-yellow-500/10 border border-primary/20 shadow-sm"
        )}
      >
        <Link href={item.href} className="flex items-center gap-3 w-full">
          <div className={cn(
            "p-1.5 rounded-md transition-colors duration-300 flex-shrink-0",
            isActive ? "bg-primary/20 text-primary" : "text-gray-600"
          )}>
            <item.icon className="h-4 w-4" />
          </div>
          <span className={cn(
            "font-medium transition-colors duration-300 text-sm sm:text-base",
            isActive ? "text-primary" : "text-gray-700"
          )}>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon" side="left" className="border-r border-gray-200 bg-white/95 backdrop-blur-sm">
      <SidebarHeader className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100">
        <AppLogo />
      </SidebarHeader>
      <SidebarContent asChild>
        <ScrollArea className="h-full hide-scrollbar">
          <div className="p-2">
            <SidebarMenu className="gap-1">
              {NAV_ITEMS_MAIN.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </div>
          <SidebarSeparator className="mx-4 my-2" />
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              AI Tools
            </SidebarGroupLabel>
            <div className="p-2">
              <SidebarMenu className="gap-1">
                {NAV_ITEMS_TOOLS.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </SidebarMenu>
            </div>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2 p-3 sm:p-4 border-t border-gray-100">
        <SidebarMenu>
          {NAV_ITEMS_BOTTOM.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </SidebarMenu>
        <div className="flex items-center justify-between pt-2">
          <ThemeToggle />
          <UserProfileButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}