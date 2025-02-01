import { cn } from '@/lib/utils';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { NavUserProperty } from './nav-user-property';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

export function NavUserDesktop({ logout, className, ...props }: { logout?: () => Promise<void> } & React.ComponentPropsWithoutRef<typeof Avatar>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={cn('h-9 w-9 cursor-pointer rounded-full', className)} {...props}>
          {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
          <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
            <NavUserProperty property="initials" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
              <AvatarFallback className="rounded-lg">
                <NavUserProperty property="initials" />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                <NavUserProperty property="name" />
              </span>
              <span className="truncate text-xs">
                <NavUserProperty property="email" />
              </span>
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
