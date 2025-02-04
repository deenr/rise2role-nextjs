'use client';

import { cn } from '@/lib/utils';
import { ChevronsUpDown, LogOut, Share2, User } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar';

export function NavUserMobile({
  logout,
  className,
  userProfile,
  ...props
}: {
  logout?: () => Promise<void>;
  userProfile: {
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
} & React.ComponentPropsWithoutRef<typeof Avatar>) {
  const { setOpenMobile } = useSidebar();
  const getInitials = () => {
    if (!userProfile.firstName && !userProfile.lastName) {
      return userProfile.email.slice(0, 2).toUpperCase();
    }

    if (userProfile.firstName && !userProfile.lastName) {
      return userProfile.firstName.slice(0, 2).toUpperCase();
    }

    if (!userProfile.firstName && userProfile.lastName) {
      return userProfile.lastName.slice(0, 2).toUpperCase();
    }

    return `${userProfile.firstName?.[0] ?? ''}${userProfile.lastName?.[0] ?? ''}`.toUpperCase();
  };

  const getFullName = () => {
    if (!userProfile.firstName && !userProfile.lastName) {
      return null;
    }

    if (userProfile.firstName && !userProfile.lastName) {
      return userProfile.firstName;
    }

    if (!userProfile.firstName && userProfile.lastName) {
      return userProfile.lastName;
    }

    return `${userProfile.firstName} ${userProfile.lastName}`;
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" variant="outline" className={cn('rounded-xl', className)} {...props}>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{getFullName()}</span>
                  <span className="truncate text-xs">{userProfile.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
            <DropdownMenuGroup>
              <Link href="/dashboard/settings" onClick={() => setOpenMobile(false)}>
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/dashboard/settings?tab=share" onClick={() => setOpenMobile(false)}>
                <DropdownMenuItem>
                  <Share2 />
                  Share
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setOpenMobile(false);
                logout && logout();
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
