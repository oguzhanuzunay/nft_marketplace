import images from '@/assets';
import Image from 'next/image';

interface CreatorCardProps {
  creatorName: string;
  rank: number;
  creatorImage: any;
  creatorEth: number;
}

const CreatorCard = ({ creatorName, rank, creatorImage, creatorEth }: CreatorCardProps) => {
  return (
    <div className="m-4 flex min-w-190 flex-col rounded-3xl border border-nft-gray-1 bg-white p-4 dark:border-nft-black-1 dark:bg-nft-black-3 minlg:min-w-240">
      <div className="flexCenter h-8 w-8 rounded-full bg-nft-red-violet minlg:h-10 minlg:w-10">
        <p className="font-poppins text-base font-semibold text-white minlg:text-lg">{rank}</p>
      </div>

      <div className="my-2 flex justify-center">
        <div className="relative h-20 w-20 minlg:h-28 minlg:w-28">
          <Image
            src={creatorImage}
            layout="fill"
            alt="creatorName"
            objectFit="cover"
            className="rounded-full"
          />
          <div className="absolute -right-0 bottom-2 h-4 w-4 minlg:h-7 minlg:w-7">
            <Image
              src={images.tick}
              alt="tick"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <div className="flexCenter mt-3 flex-col text-center minlg:mt-7">
        <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
          {creatorName}
        </p>
        <p className="mt-1 font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
          {creatorEth.toFixed(2)} <span className="font-normal"> ETH</span>
        </p>
      </div>
    </div>
  );
};

export default CreatorCard;
