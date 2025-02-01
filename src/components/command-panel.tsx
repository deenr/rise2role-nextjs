'use client';

import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Kanban, Search, Share2, Tags, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CommandPanel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button variant="outline" className="hidden min-w-64 pl-3 pr-2.5 md:flex md:flex-row md:items-center" onClick={() => setOpen(true)}>
        <Search className="size-4 text-muted-foreground" />
        <div className="text-base font-normal text-muted-foreground md:text-sm">Search...</div>
        <kbd className="ml-auto inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <Link href="/dashboard/kanban" onClick={() => setOpen(false)}>
              <CommandItem>
                <Kanban />
                <span>Kanban board</span>
              </CommandItem>
            </Link>
            <Link href="/dashboard/categories" onClick={() => setOpen(false)}>
              <CommandItem>
                <Tags />
                <span>Categories</span>
              </CommandItem>
            </Link>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <Link href="/dashboard/settings?tab=share" onClick={() => setOpen(false)}>
              <CommandItem>
                <Share2 />
                <span>Share</span>
                {/* <CommandShortcut>⌘S</CommandShortcut> */}
              </CommandItem>
            </Link>
            <Link href="/dashboard/settings?tab=profile" onClick={() => setOpen(false)}>
              <CommandItem>
                <User />
                <span>Profile</span>
                {/* <CommandShortcut>⌘P</CommandShortcut> */}
              </CommandItem>
            </Link>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
