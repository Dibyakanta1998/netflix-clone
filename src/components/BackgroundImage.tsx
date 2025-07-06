import type { FC } from "react";

type Props = {
  src: string;
  alt: string;
};

const BackgroundImage: FC<Props> = ({ src, alt }) => {
  return (
    <div className="absolute h-screen w-screen hidden   sm:block md:block xl:block 2xl:block ">
      <img src={src} alt={alt} className="" />
    </div>
  );
};

export default BackgroundImage;
