'use client';
import axios from 'axios';
import { Contract } from 'ethers';
import React, { useEffect, useState } from 'react';
import { MarketAbi, MarketAddress } from './constants';

const fetchContract = (signerOrProvider: any) =>
  new Contract(MarketAddress, MarketAbi, signerOrProvider);

type NFTContextType = {
  nftCurrency: string;
  currentAccount: string;
  uploadToIPFS: (file: any) => void;
  connectWallet: () => void;
};

export const NFTContext = React.createContext<NFTContextType | null>(null);

export const NFTProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const nftCurrency = 'ETH';

  const checkIfWalletIsConnected = async () => {
    if (!(window as any).ethereum) {
      return alert('Please install MetaMask');
    }

    const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    createNFT('test', '0.025');
  }, []);

  const connectWallet = async () => {
    if (!(window as any).ethereum) return alert('Please install MetaMask.');

    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  const uploadToIPFS = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const metadata = JSON.stringify({
        name: file.name,
      });
      formData.append('pinataMetadata', metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append('pinataOptions', options);

      const response = await axios({
        method: 'POST',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          pinata_api_key: '0bb75b832af91e76f7a5',
          pinata_secret_api_key: '3bf374df826862ed029ad3c4712d131974c7e382e11b10451f5b11195e0c4760',
          'Content-Type': 'multipart/form-data',
        },
      });
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      return ImgHash;
    } catch (err) {
      console.log('Unable to upload file to Pinata: ' + err);
    }
  };

  const createNFT = async (
    name: string,
    description: string,
    price: string,
    image: string,
    router: string,
  ) => {
    if (!name || !description || !price || !image) return console.log('Data Is Missing');

    const data = JSON.stringify({
      name,
      description,
      image,
    });

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data,
        headers: {
          pinata_api_key: '0bb75b832af91e76f7a5',
          pinata_secret_api_key: '3bf374df826862ed029ad3c4712d131974c7e382e11b10451f5b11195e0c4760',
          'Content-Type': 'multipart/form-data',
        },
      });
      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(url);

      
      await createSale(url, price);

      router.push('/created-nfts');
    } catch (err) {
      console.log('Error while create NFT');
    }
  };

  const createSale = async (url: string, formInputPrice: string, isReselling, id) => {
    const { data, isError, isLoading } = useContractRead({
      address:

  };

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        currentAccount,
        uploadToIPFS,
        connectWallet,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
