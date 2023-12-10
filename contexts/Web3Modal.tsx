'use client';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { useEffect, useState } from 'react';

import { WagmiConfig } from 'wagmi';

import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  localhost,
  mainnet,
  optimism,
  polygon,
} from 'wagmi/chains';

const chains = [mainnet, polygon, avalanche, arbitrum, bsc, optimism, gnosis, fantom, localhost];

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';

const metadata = {
  name: 'Next Starter Template',
  description: 'A Next.js starter template with Web3Modal v3 + Wagmi',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

export function Web3Modal({ children }) {
  createWeb3Modal({ wagmiConfig, projectId, chains });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return <>{ready ? <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig> : null}</>;
}
