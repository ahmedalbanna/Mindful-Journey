
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
  sidebarMenuButtonVariants, // Import variants for styling Link
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Leaf } from 'lucide-react';

export function SidebarNav() {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();

  return (
    <nav className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
        <Leaf className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-headline font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">{APP_NAME}</h1>
      </div>
      <SidebarMenu className="flex-1 p-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          // Define the core link content with styling
          const linkElement = (
            <Link
              href={item.href}
              className={cn(
                sidebarMenuButtonVariants({ variant: 'default', size: 'default' }),
                "w-full justify-start", // Keep original specific styles
                // isActive is handled by data-active in sidebarMenuButtonVariants
              )}
              data-active={isActive ? 'true' : undefined} // Pass data-active for styling
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
            </Link>
          );

          // Conditionally wrap with Tooltip
          if (state === "collapsed" || isMobile) {
            return (
              <SidebarMenuItem key={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {linkElement}
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    align="center"
                    className="font-body"
                  >
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            );
          }

          // Render without Tooltip
          return (
            <SidebarMenuItem key={item.href}>
              {linkElement}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <p className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
          © {new Date().getFullYear()} {APP_NAME}
        </p>
      </div>
    </nav>
  );
}
