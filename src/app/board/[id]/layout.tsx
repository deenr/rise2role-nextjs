import { Rise2RoleLogo } from '@/components/rise2role-logo';
import { HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export default function LandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-dvh min-h-dvh flex-col bg-background">
      <header className="fixed top-0 z-50 w-full border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:relative md:border-b-0">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href={'/'}>
            <Rise2RoleLogo className="h-6 min-h-6 w-[170px]" />
          </Link>

          <p className="ml-4 text-sm text-muted-foreground">You are viewing a shared board.</p>
        </div>
      </header>
      <main className="flex-1 px-4 pt-[80px] sm:px-6 md:pt-0">{children}</main>
      <footer className="flex min-h-14 w-full items-center px-4 sm:px-6">
        <p className="text-sm text-muted-foreground">©2025 Rise2Role</p>
        <p className="inline-flex flex-1 items-center justify-end gap-1 text-xs text-muted-foreground sm:text-sm">
          Made with <HeartHandshake className="h-4 w-4 text-primary" />
          by
          <a href="https://github.com/deenr" aria-label="GitHub of deenr" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-primary">
            Dean Reymen
          </a>
        </p>
      </footer>
    </div>
  );
}
