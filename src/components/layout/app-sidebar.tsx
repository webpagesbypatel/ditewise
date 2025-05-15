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
import { Button } from "@/components/ui/button"
import { NAV_ITEMS_MAIN, NAV_ITEMS_TOOLS, NAV_ITEMS_BOTTOM, APP_NAME, APP_ICON, type NavItem } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { UserProfileButton } from "./user-profile-button"
import { ScrollArea } from "@/components/ui/scroll-area"

function AppLogo() {
  const { state } = useSidebar();
  const AppIcon = APP_ICON;
  return (
    <Link href="/dashboard" className="flex items-center gap-2 px-2">
      <AppIcon className="h-7 w-7 text-primary" />
      {state === 'expanded' && <h1 className="text-xl font-semibold text-sidebar-foreground">{APP_NAME}</h1>}
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
        className="justify-start"
      >
        <Link href={item.href}>
          <item.icon />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon" side="left">
      <SidebarHeader className="flex items-center justify-between p-2">
        <AppLogo />
      </SidebarHeader>
      <SidebarContent asChild>
        <ScrollArea className="h-full">
        <SidebarMenu className="gap-2">
          {NAV_ITEMS_MAIN.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {NAV_ITEMS_TOOLS.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2 p-2">
         <SidebarMenu>
          {NAV_ITEMS_BOTTOM.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </SidebarMenu>
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <UserProfileButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
