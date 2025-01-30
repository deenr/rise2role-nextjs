'use client';

import { signOutAction } from '@/app/dashboard/actions';
import { CommandPanel } from '@/components/command-panel';
import { NavUserDesktop } from '@/components/nav-user-desktop';
import { Rise2RoleLogo } from '@/components/rise2role-logo';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Share2 } from 'lucide-react';
import Link from 'next/link';

export function NavHeader() {
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
        {/* <Button className="relative" variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </Button> */}
      </div>
      <NavUserDesktop
        className="hidden md:block"
        user={{
          name: 'Dean Reymen',
          email: 'dean@reymen.be'
        }}
        logout={signOutAction}
      />
      <Rise2RoleLogo className="block h-6 min-h-6 w-[170px] md:hidden" />
      <SidebarTrigger className="ml-auto block md:hidden" />
    </header>
  );
}
