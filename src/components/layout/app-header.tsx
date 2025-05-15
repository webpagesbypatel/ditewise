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
  const currentLabel = findLabel(pathname);

  // Simple breadcrumb logic
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = findLabel(href);
    return { href, label: label === APP_NAME && segment !== 'dashboard' ? segment.charAt(0).toUpperCase() + segment.slice(1) : label };
  });


  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            {index === 0 && pathSegments[0] !== 'dashboard' && (
              <>
                <ChevronRight className="h-3 w-3" />
                 <Link href={crumb.href} className={cn("truncate", index === breadcrumbs.length -1 ? "text-foreground font-medium" : "hover:text-foreground")}>
                  {crumb.label}
                </Link>
              </>
            )}
            {index > 0 && (
              <>
                <ChevronRight className="h-3 w-3" />
                <Link href={crumb.href} className={cn("truncate", index === breadcrumbs.length -1 ? "text-foreground font-medium" : "hover:text-foreground")}>
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
