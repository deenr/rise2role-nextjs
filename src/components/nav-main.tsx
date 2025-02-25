'use client';

import { SidebarGroup, SidebarMenu, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';

export function NavMain({
  items
}: {
  items: {
    title: string;
    url: string;
    icon: JSX.Element;
  }[];
}) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <SidebarGroup className="p-4">
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <SidebarMenuButton isActive={isActive} key={item.title} asChild>
              <Link href={item.url} onClick={() => setOpenMobile(false)}>
                {item.icon}
                {item.title}
              </Link>
            </SidebarMenuButton>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
