import { BackButton } from "@/app/_components/back-button";
import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductBannerProps {
  product: Pick<Product, "name" | "imageUrl">;
}

export const ProductBanner = ({ product }: ProductBannerProps) => {
  return (
    <>
      <Image src={product.imageUrl} alt={product.name} fill unoptimized />
      <div className="absolute left-4 top-4">
        <BackButton />
      </div>
    </>
  );
};
