'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Notebook, LayoutDashboard, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/notes',
      label: 'All Notes',
      icon: Notebook,
      isActive: pathname.startsWith('/notes'),
    },
    {
      href: '/board',
      label: 'Board',
      icon: LayoutDashboard,
      isActive: pathname === '/board',
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="h-14 items-center justify-center">
        <BrainCircuit className="h-8 w-8 text-primary" />
      </SidebarHeader>
      <SidebarMenu className="flex-1 justify-center">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                tooltip={{ children: item.label, side: 'right' }}
              >
                <item.icon />
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </Sidebar>
  );
}
