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
        <main className="flex-1 p-4 md:p-6">
          <ScrollArea className="h-[calc(100vh-var(--header-height)-2rem)]"> {/* Adjust height as needed */}
             {children}
          </ScrollArea>
        </main>
      </SidebarInset>
    </>
  );
}
