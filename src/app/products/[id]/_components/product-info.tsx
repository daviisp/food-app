import { ProductList } from "@/app/_components/product-list";
import { RestaurantDeliveryInfo } from "@/app/_components/restaurant-delivery-info";
import { Button } from "@/components/ui/button";
import { calculateDiscountProduct, formatPrice } from "@/helpers/price";
import { Prisma, Product } from "@prisma/client";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <>
      <div className="flex items-center gap-1">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={16}
          height={16}
          className="rounded-full"
        />
        <p className="text-xs text-[#7E8392]">{product.restaurant.name}</p>
      </div>
      <p className="mt-1 block font-semibold">{product.name}</p>
      <div className="pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <p className="text-lg font-semibold">
              {formatPrice(calculateDiscountProduct(product))}
            </p>
            <div className="flex w-[23px] items-center justify-center rounded-full bg-button px-2 py-0.5 text-xs font-semibold text-white">
              <ArrowDown size={16} />
              {product.discountPercentage}%
            </div>
          </div>
          <div className="space-x-2.5">
            <Button
              size={"icon"}
              className="rounded-lg border border-[#EEE] bg-white text-black hover:bg-white"
            >
              <ChevronLeft />
            </Button>
            <span>1</span>
            <Button size={"icon"} className="rounded-lg bg-button">
              <ChevronRight />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          De: {formatPrice(Number(product.originalPrice))}
        </p>
      </div>
    </>
  );
};
