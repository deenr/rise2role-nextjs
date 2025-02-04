'use client';

import { signOutAction } from '@/app/dashboard/actions';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { getUserProfile } from '@/data-access/user-profile';
import { getCurrentUser } from '@/lib/session';
import { Kanban, Tags } from 'lucide-react';
import { useEffect, useState } from 'react';
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
      title: 'Categories',
      url: '/dashboard/categories',
      icon: <Tags />
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userProfile, setUserProfile] = useState<{
    email: string;
    firstName: string | null;
    lastName: string | null;
  } | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await getCurrentUser();
      const profile = await getUserProfile(user);
      setUserProfile(profile);
    };

    fetchUserProfile();
  }, []);

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
        {userProfile && <NavUserMobile className="block md:hidden" logout={signOutAction} userProfile={userProfile} />}
      </SidebarFooter>
    </Sidebar>
  );
}
