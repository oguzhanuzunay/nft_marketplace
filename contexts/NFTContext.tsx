'use client';
import axios from 'axios';

import React, { useEffect, useState } from 'react';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOTUzYWI5OS01NzJjLTQzNGMtOTU2My01ZWVlYzFjYjJhZDUiLCJlbWFpbCI6Im9ndXpoYW56bnlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjBiYjc1YjgzMmFmOTFlNzZmN2E1Iiwic2NvcGVkS2V5U2VjcmV0IjoiM2JmMzc0ZGY4MjY4NjJlZDAyOWFkM2M0NzEyZDEzMTk3NGM3ZTM4MmUxMWIxMDQ1MWY1YjExMTk1ZTBjNDc2MCIsImlhdCI6MTcwMjA5NTg4Nn0.zJZPS0kI3__S6cdah_bNkilClEMXbe9rqnb09fd02B4

type NFTContextType = {
  nftCurrency: string;
  currentAccount: string;
  uploadToIPFS: (file: any) => void;
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

  const uploadToIPFS = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData);
      const metadata = JSON.stringify({
        name: 'File name',
      });
      formData.append('pinataMetadata', metadata);
      
      const options = JSON.stringify({
        cidVersion: 0,
      })
      formData.append('pinataOptions', options);
      console.log(formData);

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
      console.log(response)
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      return ImgHash;
    } catch (err) {
      console.log('Unable to upload file to Pinata: ' + err);
    }
  };
  /*
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
          pinata_api_secret_key: '3bf374df826862ed029ad3c4712d131974c7e382e11b10451f5b11195e0c4760',
          'Content-Type': 'application/json',
        },
      });
      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(url);
    } catch (err) {
      console.log('Error while create NFT');
    }
  };
*/
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
