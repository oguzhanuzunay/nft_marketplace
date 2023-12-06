interface BannerProps {
  name: string;
  childStyles: string;
  parentStyles: string;
}

const Banner = ({ name, childStyles, parentStyles }: BannerProps) => {
  return (
    <div
      className={`nft-gradient relative z-0 flex w-full items-center overflow-hidden ${parentStyles}`}
    >
      <p className={`font-poppins text-5xl font-bold leading-70 ${childStyles}`}>{name}</p>

      <div className="white-bg absolute -left-16 -top-9 -z-5 h-48 w-48 rounded-full sm:h-32 sm:w-32" />

      <div className="white-bg absolute -bottom-24 -right-14 -z-5 h-72 w-72 rounded-full sm:h-56 sm:w-56" />
    </div>
  );
};

export default Banner;
