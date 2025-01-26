'use client';

import { signOutAction } from '@/app/dashboard/actions';
import { Bell, Search, Share2 } from 'lucide-react';
import { NavUserDesktop } from './nav-user-desktop';
import { Rise2RoleLogo } from './rise2role-logo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SidebarTrigger } from './ui/sidebar';

export function NavHeader() {
  return (
    <header className="fixed flex h-16 w-full flex-row items-center gap-4 border-b bg-sidebar pl-4 pr-2 md:w-[calc(100%-256px)] md:pl-6 md:pr-6">
      <div className="group relative hidden min-w-64 md:block">
        <Search className="absolute left-3 top-1/2 size-4 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all group-focus-within:scale-110 group-focus-within:text-primary" />
        <Input className="bg-background pl-9" placeholder="Search..." />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 ml-auto inline-flex h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <div className="ml-auto hidden gap-1 md:flex">
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share board</span>
        </Button>
        <Button className="relative" variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </Button>
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
