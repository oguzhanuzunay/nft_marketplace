/* eslint-disable tailwindcss/no-custom-classname */
'use client';
import { useTheme } from '@/contexts/ThemeProvider';

import Image from 'next/image';
import Link from 'next/link';

import images from '@/assets';
import { NFTContext } from '@/contexts/NFTContext';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { Button } from './';

interface menuItemProps {
  isMobile?: boolean;
  active: string;
  setActive: any;
}

interface ButtonGroupProps {
  setActive: any;
  router: any;
}

interface NFTContextType {
  currentAccount: string;
  connectWallet: () => void;
}

const MenuItems = ({ isMobile, active, setActive }: menuItemProps) => {
  const generateLinks = (i: number) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nfts';
      default:
        return '/';
    }
  };

  return (
    <ul className={`flexCenter list-none flex-row ${isMobile && 'h-full flex-col'}`}>
      {['Explore NTFs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          onClick={() => setActive(item)}
          key={i}
          className={`mx-3 flex flex-row items-center font-poppins text-base font-semibold hover:text-nft-dark dark:hover:text-white
          ${
            active === item
              ? 'text-nft-dark-1 dark:text-white'
              : 'text-nft-gray-2 dark:text-nft-gray-3'
          }
          `}
        >
          <Link href={generateLinks(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }: ButtonGroupProps) => {
  const { connectWallet, currentAccount } = useContext(NFTContext) as NFTContextType ;

  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');

        router.push('/create-nft');
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet}
    />
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState('Explore NTFs');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flexBetween fixed z-10 w-full border-b border-nft-gray-1 bg-white p-4 dark:border-nft-black-1 dark:bg-nft-dark">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter cursor-pointer md:hidden"
            onClick={() => {}}
          >
            <Image
              src={images.logo02}
              alt="logo"
              width={32}
              height={32}
              objectFit="contain"
            />
            <p className="ml-1 text-lg font-semibold text-nft-black-1 dark:text-white">
              CryptoNite
            </p>
          </div>
        </Link>
        <Link href="/">
          <div
            className="hidden md:flex"
            onClick={() => {}}
          >
            <Image
              src={images.logo02}
              alt="logo"
              width={32}
              height={32}
              objectFit="contain"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="mr-2 flex items-start">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween label relative h-4 w-8 rounded-2xl bg-black p-1"
          >
            <i className="fas fa-sun"></i>
            <i className="fas fa-moon"></i>
            <div className="ball absolute h-3 w-3 rounded-full bg-white "></div>
          </label>
        </div>
      </div>
      <div className="flex md:hidden">
        <MenuItems
          isMobile={false}
          active={active}
          setActive={setActive}
        />
        <div className="ml-4 ">
          <ButtonGroup
            setActive={setActive}
            router={router}
          />
        </div>
      </div>

      <div className="ml-2 hidden md:flex">
        {isOpen ? (
          <Image
            src={images.cross}
            objectFit="contain"
            alt="close"
            width={25}
            height={25}
            onClick={() => setIsOpen(!isOpen)}
            className={theme === 'light' ? 'invert' : 'invert-0'}
          />
        ) : (
          <Image
            src={images.menu}
            objectFit="contain"
            alt="menu"
            width={25}
            height={25}
            className={theme === 'light' ? 'invert' : 'invert-0'}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
        {isOpen && (
          <div className="nav-h fixed inset-0 top-65 z-10 flex flex-col justify-between bg-white dark:bg-nft-dark">
            <div className="flex-1 p-4">
              <MenuItems
                isMobile
                active={active}
                setActive={setActive}
              />
            </div>

            <div className="border-t border-nft-gray-1 p-4 dark:border-nft-black-1">
              <ButtonGroup
                setActive={setActive}
                router={router}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
