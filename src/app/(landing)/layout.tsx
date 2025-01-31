'use client';

import { Footer } from './footer';
import { Header } from './header';

export default function LandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
