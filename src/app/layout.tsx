import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';

const defaultUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Rise2Role',
  description: 'Rise2Role is a kanban-style job application board designed to help you track and manage your job applications effortlessly.',
  openGraph: {
    title: 'Rise2Role',
    siteName: 'Rise2Role',
    description: 'Rise2Role is a kanban-style job application board designed to help you track and manage your job applications effortlessly.',
    type: 'website',
    url: 'https://rise2role.com/',
    images: [
      {
        url: 'https://raw.githubusercontent.com/deenr/rise2role/main/public/thumbnail.jpg',
        width: 1200,
        height: 628,
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rise2Role',
    description: 'Rise2Role is a kanban-style job application board designed to help you track and manage your job applications effortlessly.',
    images: ['https://raw.githubusercontent.com/deenr/rise2role/main/public/thumbnail.jpg']
  },
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png'
  }
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
