'use client';
import React, { useEffect, useState } from 'react';

type NFTContextType = {
  nftCurrency: string;
  currentAccount: string;
  connectWallet: () => void;
};

export const NFTContext = React.createContext<NFTContextType | null>(null);

export const NFTProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const nftCurrency = 'ETH';
  const [currentAccount, setCurrentAccount] = useState('');

  const checkIfWalletIsConnected = async () => {
    if (!(window as any).ethereum) {
      return alert('Please install MetaMask');
    }

    const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
    console.log({ accounts });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!(window as any).ethereum) return alert('Please install MetaMask.');

    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        currentAccount,
        connectWallet,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
