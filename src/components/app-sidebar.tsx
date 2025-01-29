'use client';

import * as React from 'react';

import { signOutAction } from '@/app/dashboard/actions';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { File, Kanban, Tags } from 'lucide-react';
import { NavUserMobile } from './nav-user-mobile';
import { Rise2RoleLogo } from './rise2role-logo';
import { SidebarCta } from './sidebar-opt-in-form';

const data = {
  navMain: [
    // {
    //   title: 'Dashboard',
    //   url: '/dashboard',
    //   icon: <LayoutDashboard />
    // },
    {
      title: 'Kanban Board',
      url: '/dashboard/kanban',
      icon: <Kanban />
    },
    {
      title: 'Job Applications',
      url: '/dashboard/jobs',
      icon: <File />
    },
    {
      title: 'Categories',
      url: '/dashboard/categories',
      icon: <Tags />
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex h-16 justify-center border-b px-5">
        <Rise2RoleLogo className="h-6 min-h-6 w-[170px]" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="gap-4 p-4 pb-6">
        <SidebarCta />
        {isMobile && (
          <NavUserMobile
            user={{
              name: 'Dean Reymen',
              email: 'dean@reymen.be'
            }}
            logout={signOutAction}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
