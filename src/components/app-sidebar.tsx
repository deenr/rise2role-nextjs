import * as React from 'react';

import { signOutAction } from '@/app/dashboard/actions';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { Files, Kanban, Tags } from 'lucide-react';
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
      icon: <Files />
    },
    {
      title: 'Categories',
      url: '/dashboard/categories',
      icon: <Tags />
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavUserMobile className="block md:hidden" logout={signOutAction} />
      </SidebarFooter>
    </Sidebar>
  );
}
