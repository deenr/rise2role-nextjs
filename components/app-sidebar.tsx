import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { File, Kanban, LayoutDashboard, Tags } from 'lucide-react';
import { Rise2RoleLogo } from './rise2role-logo';
import { SidebarCta } from './sidebar-opt-in-form';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/app',
      icon: <LayoutDashboard />
    },
    {
      title: 'Kanban Boards',
      url: '/app/boards',
      icon: <Kanban />
    },
    {
      title: 'Job Applications',
      url: '/app/jobs',
      icon: <File />
    },
    {
      title: 'Job Categories',
      url: '/app/categories',
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
      <SidebarFooter>
        <div className="p-1">
          <SidebarCta />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
