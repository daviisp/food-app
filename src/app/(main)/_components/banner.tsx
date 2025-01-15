import Image from "next/image";

interface BannerProps {
  src: string;
}

export const Banner = ({ src }: BannerProps) => {
  return (
    <div className="relative h-40 w-full">
      <Image src={src} alt="Até 30% de desconto em Pizzas" fill unoptimized />
    </div>
  );
};
