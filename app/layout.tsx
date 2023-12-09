import { ThemeProvider } from '@/contexts/ThemeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import React from 'react';
import './globals.css';
import { NFTProvider} from '@/contexts/NFTContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NFT MarketPlace',
  description:
    'NFT MarketPlace - Buy and Sell NFTs on the Ethereum Blockchain with Next.js, Tailwind CSS, and Solidity Smart Contracts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NFTProvider>

        <ThemeProvider>
          <Script
            src="https://kit.fontawesome.com/b4cf947109.js"
            crossOrigin="anonymous"
          />
          {children}
        </ThemeProvider>
        </NFTProvider>
      </body>
    </html>
  );
}
