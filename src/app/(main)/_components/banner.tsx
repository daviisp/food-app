import Image from "next/image";

interface BannerProps {
  src: string;
  className?: string;
}

export const Banner = ({ src, className }: BannerProps) => {
  return (
    <div className="relative h-40 w-full md:h-[371px] md:w-[371px]">
      <Image
        src={src}
        alt="Até 30% de desconto em Pizzas"
        fill
        unoptimized
        className={className}
      />
    </div>
  );
};
