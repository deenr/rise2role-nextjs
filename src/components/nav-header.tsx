'use client';

import { signOutAction } from '@/app/dashboard/actions';
import { CommandPanel } from '@/components/command-panel';
import { NavUserDesktop } from '@/components/nav-user-desktop';
import { Rise2RoleLogo } from '@/components/rise2role-logo';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { getUserProfile } from '@/data-access/user-profile';
import { getCurrentUser } from '@/lib/session';
import { Share2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

export function NavHeader() {
  const [userProfile, setUserProfile] = useState<{ email: string; firstName: string | null; lastName: string | null } | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await getCurrentUser();
      const profile = await getUserProfile(user);
      setUserProfile(profile);
    };

    fetchUserProfile();
  }, []);

  return (
    <header className="fixed z-50 flex h-16 w-full flex-row items-center gap-4 border-b bg-sidebar pl-4 pr-2 md:w-[calc(100%-256px)] md:pl-8 md:pr-8">
      <CommandPanel />
      <div className="ml-auto hidden gap-1 md:flex">
        <Link href="/dashboard/settings?tab=share">
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share board</span>
          </Button>
        </Link>
      </div>
      {userProfile ? <NavUserDesktop className="hidden md:block" logout={signOutAction} userProfile={userProfile} /> : <Skeleton className="size-9 rounded-full" />}
      <Rise2RoleLogo className="block h-6 min-h-6 w-[170px] md:hidden" />
      <SidebarTrigger className="ml-auto block md:hidden" />
    </header>
  );
}
