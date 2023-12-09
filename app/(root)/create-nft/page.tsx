'use client';
import { NFTContext } from '@/contexts/NFTContext';
import { useTheme } from '@/contexts/ThemeProvider';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import images from '@/assets';
import { Button, Input } from '@/components';
import Image from 'next/image';
const CreateNFT = () => {
  const { theme } = useTheme();
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: '',
    description: '',
    price: '',
  });
  const { uploadToIPFS } = useContext(NFTContext);

  const onDrop = useCallback(async (acceptedFile: any) => {    
    const url = await uploadToIPFS(acceptedFile[0]);
    console.log(url);
    setFileUrl(url);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
      ${isDragActive && 'border-file-active'} 
      ${isDragAccept && 'border-file-accept'}
      ${isDragReject && 'border-file-reject'}  
      `,
    [isDragAccept, isDragActive, isDragReject],
  );

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-3/5 md:w-full">
        <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white xs:ml-0 minlg:text-4xl">
          Create new NFT
        </h1>
        <div className="mt-16">
          <p className="font-poppins text-xl font-semibold text-nft-black-1 dark:text-white">
            Upload File
          </p>
          <div className="mt-4">
            <div
              className={fileStyle}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins text-xl font-semibold text-nft-black-1 dark:text-white">
                  JPG, PNG, GIF, WEBP, MP4 or MP3. Max 500mb.
                </p>
                <div className="my-12 flex w-full justify-center">
                  <Image
                    src={images.upload}
                    alt="upload"
                    width={100}
                    height={100}
                    objectFit="contain"
                    className={theme === 'light' ? 'invert' : ''}
                  />
                </div>
                <p className="mt-2 font-poppins text-sm font-semibold text-nft-black-1 dark:text-white">
                  <span className="text-nft-red-violet"> Drag </span>
                  and <span className="text-nft-red-violet"> Drop </span>
                  your file here
                </p>
                <p className="mt-2 font-poppins text-sm font-semibold text-nft-black-1 dark:text-white">
                  or
                  <span className="text-nft-red-violet"> Browse </span>
                  your computer
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <Image
                    src={fileUrl}
                    width={700}
                    height={700}
                    alt="asset_file"
                  />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType="input"
          title="Name"
          placeHolder="NFT Name"
          handleClick={(e: any) => setFormInput({ ...formInput, name: e.target.value })}
        />
        <Input
          inputType="textarea"
          title="Description"
          placeHolder="NFT Description"
          handleClick={(e: any) => setFormInput({ ...formInput, description: e.target.value })}
        />
        <Input
          inputType="number"
          title="Price"
          placeHolder="NFT Price"
          handleClick={(e: any) => setFormInput({ ...formInput, price: e.target.value })}
        />

        <div className="mt-7 flex w-full justify-end">
          <Button
            btnName="Create NFT"
            classStyles="rounded-xl"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
