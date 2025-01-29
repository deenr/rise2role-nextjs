'use client';

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Files, Kanban, Search, Share2, Tags, User } from 'lucide-react';
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
      <div className="group relative hidden min-w-64 md:block">
        <Search className="absolute left-3 top-1/2 size-4 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all group-focus-within:scale-110 group-focus-within:text-primary" />
        <Input className="bg-background pl-9" placeholder="Search..." onClick={() => setOpen(true)} />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 ml-auto inline-flex h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
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
            <Link href="/dashboard/jobs" onClick={() => setOpen(false)}>
              <CommandItem>
                <Files />
                <span>Job applications</span>
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
            <CommandItem>
              <Share2 />
              <span>Share</span>
              {/* <CommandShortcut>⌘S</CommandShortcut> */}
            </CommandItem>
            <CommandItem>
              <User />
              <span>Profile</span>
              {/* <CommandShortcut>⌘P</CommandShortcut> */}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
