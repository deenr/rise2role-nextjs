'use client';

import { cn } from '@/lib/utils';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

export function NavUserDesktop({
  logout,
  userProfile,
  className,
  ...props
}: {
  logout?: () => Promise<void>;
  userProfile: {
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
} & React.ComponentPropsWithoutRef<typeof Avatar>) {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={cn('h-9 w-9 cursor-pointer rounded-full', className)} {...props}>
          <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">{getInitials()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{getFullName()}</span>
              <span className="truncate text-xs">{userProfile.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard/settings">
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
