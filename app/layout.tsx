import { Rise2RoleLogo } from '@/components/rise2role-logo';
import { ThemeProvider } from 'next-themes';
import { Geist } from 'next/font/google';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Rise2Role',
  description: 'Rise2Role is a kanban-style job application board designed to help you track and manage your job applications effortlessly.'
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin']
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="flex min-h-screen flex-col items-center">
            <nav className="mx-auto flex h-16 w-full items-center justify-center border-b">
              <div className="w-full max-w-7xl px-8">
                <Rise2RoleLogo className="h-6 min-h-6 w-[170px]" />
              </div>
            </nav>

            <div className="mx-auto flex h-full w-full flex-1 justify-center bg-muted">
              <div className="w-full max-w-7xl px-8">{children}</div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
