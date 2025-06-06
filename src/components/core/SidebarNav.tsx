"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from '@/components/ui/sidebar';
import { Leaf } from 'lucide-react';

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
        <Leaf className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-headline font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">{APP_NAME}</h1>
      </div>
      <SidebarMenu className="flex-1 p-2">
        {NAV_ITEMS.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                )}
                isActive={pathname === item.href}
                tooltip={{ children: item.title, className: "font-body" }}
              >
                <item.icon className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <p className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
          © {new Date().getFullYear()} {APP_NAME}
        </p>
      </div>
    </nav>
  );
}
