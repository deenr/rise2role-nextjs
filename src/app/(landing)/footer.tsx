import { Rise2RoleLogo } from '@/components/rise2role-logo';
import { HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const links = [
    // {
    //   title: 'Product',
    //   links: [{ title: 'Steps' }, { title: 'Benefits' }]
    // },
    {
      title: 'Socials',
      links: [
        { title: 'GitHub', url: 'https://github.com/deenr/rise2role-nextjs', targetBlank: true },
        { title: 'LinkedIn', url: 'https://www.linkedin.com/in/dean-reymen/', targetBlank: true }
      ]
    },
    {
      title: 'Legal',
      links: [
        { title: 'Terms', url: '/terms', targetBlank: false },
        { title: 'Privacy', url: '/privacy', targetBlank: false },
        { title: 'Cookies', url: '/cookies', targetBlank: false }
      ]
    }
  ];
  return (
    <footer className="bg-muted px-4 py-8 pt-16 dark:bg-muted/30 sm:px-6 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col justify-between gap-12 sm:flex-row md:gap-16">
          <div className="flex flex-col gap-6 md:gap-8">
            <Link href={'/'}>
              <Rise2RoleLogo className="h-6 min-h-6 w-[170px]" />
            </Link>
            <p className="text-base font-normal text-muted-foreground">Stay organized. Stay focused. Get hired.</p>
          </div>
          <div className="grid grid-cols-2 flex-row gap-8 sm:flex">
            {links.map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-4 md:min-w-28">
                <div className="text-sm font-normal text-muted-foreground">{title}</div>
                <div className="flex flex-col gap-3">
                  {links.map((link) =>
                    link.targetBlank ? (
                      <a key={link.title} href={link.url} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-muted-foreground">
                        {link.title}
                      </a>
                    ) : (
                      <a key={link.title} href={link.url} className="text-base font-medium text-muted-foreground">
                        {link.title}
                      </a>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 h-[1px] bg-border"></div>
        <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row md:items-center">
          <p className="flex-1 text-xs text-muted-foreground sm:text-sm">&#169; {new Date().getFullYear()} Contribu. All rights reserved.</p>
          <p className="inline-flex flex-1 items-center justify-end gap-1 text-xs text-muted-foreground sm:text-sm">
            Made with <HeartHandshake className="h-4 w-4 text-primary" />
            by
            <a href="https://github.com/deenr" aria-label="GitHub of deenr" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-primary">
              Dean Reymen
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
