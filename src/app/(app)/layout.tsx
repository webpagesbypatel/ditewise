import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8">
          <ScrollArea className="h-[calc(100vh-var(--header-height-mobile)-1.5rem)] sm:h-[calc(100vh-var(--header-height-tablet)-2rem)] lg:h-[calc(100vh-var(--header-height-desktop)-3rem)] hide-scrollbar">
            <div className="container mx-auto max-w-none">
              {children}
            </div>
          </ScrollArea>
        </main>
      </SidebarInset>
    </>
  );
}