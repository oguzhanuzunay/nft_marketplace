import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-white dark:bg-nft-dark">
      <h1>Root</h1>
      {children}
      <h1>Footer</h1>
    </main>
  );
}
