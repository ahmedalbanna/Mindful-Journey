"use client";

import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/core/SidebarNav";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar side="left" collapsible="icon" className="border-r">
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
           <div className="md:hidden">
            <SidebarTrigger asChild>
              <Button variant="outline" size="icon">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SidebarTrigger>
          </div>
          <div className="flex-1">
            {/* Future: Breadcrumbs or dynamic title can go here */}
          </div>
          {/* Future: User avatar / settings */}
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
