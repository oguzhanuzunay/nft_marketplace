import { Footer, Navbar } from '@/components';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-white dark:bg-nft-dark">
      <Navbar />
      <div className="pt-65">{children}</div>
      <Footer />
    </main>
  );
}
