'use client';
import images from '@/assets';
import { Banner, CreatorCard, NFTCard } from '@/components';
import { useTheme } from '@/contexts/ThemeProvider';
import { makeId } from '@/utils/makeId';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Home = () => {
  const [hideButtons, setHideButtons] = useState(false);
  const { theme } = useTheme();
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  const handleScroll = (direction: string) => {
    const { current }: any = scrollRef;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current }: any = scrollRef;
    const { current: parent }: any = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);
    return () => window.removeEventListener('resize', isScrollable);
  }, []);

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <Banner
          name="Discover, collect, and sell extraordinary NFTs"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left text-white"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />

        <div>
          <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white xs:ml-0 minlg:text-4xl">
            Best Creator
          </h1>
          <div
            className="relative mt-3 flex max-w-full flex-1"
            ref={parentRef}
          >
            <div
              className="no-scrollbar flex w-max select-none flex-row overflow-x-scroll"
              ref={scrollRef}
            >
              {[6, 7, 8, 9, 10].map((index) => (
                <CreatorCard
                  key={`creator-${index}`}
                  rank={index}
                  creatorimg={images[`creator${index}` as keyof typeof images]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEth={10 - index * 0.5}
                />
              ))}
              {!hideButtons && (
                <>
                  <div
                    className="min:lg:h-12 absolute left-0 top-45 h-8 w-8 cursor-pointer minlg:w-12"
                    onClick={() => handleScroll('left')}
                  >
                    <Image
                      src={images.left}
                      alt="arrow"
                      layout="fill"
                      objectFit="contain"
                      className={theme === 'light' ? `invert` : ``}
                    />
                  </div>

                  <div
                    className="min:lg:h-12 absolute right-0 top-45 h-8 w-8 cursor-pointer minlg:w-12"
                    onClick={() => handleScroll('right')}
                  >
                    <Image
                      src={images.right}
                      alt="arrow"
                      layout="fill"
                      objectFit="contain"
                      className={theme === 'light' ? `invert` : ``}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mt-10">
            <div className="flexBetween mx-4 sm:flex-col sm:items-start xs:mx-0 minlg:mx-8">
              <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white  sm:mb-4 minlg:text-4xl">
                Hot Bids
              </h1>
              <div>SearchBar</div>
            </div>
            <div className="mt-3 flex w-full flex-wrap justify-start md:justify-center xs:justify-around ">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <NFTCard
                  key={`nft-${index}`}
                  nft={{
                    index,
                    name: `Nifty NFT ${index}`,
                    seller: `0x${makeId(3)}...${makeId(4)}`,
                    owner: `0x${makeId(3)}...${makeId(4)}`,
                    price: 10 - index * 0.5,
                    description: 'Cool NFT on sale',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
