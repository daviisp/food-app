import { calculateDiscountProduct, formatPrice } from "@/helpers/price";
import { Prisma } from "@prisma/client";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: Omit<
    Prisma.ProductGetPayload<{
      include: {
        restaurant: true;
      };
    }>,
    "originalPrice"
  > & {
    originalPrice: number;
  };
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/products/${product.id}`} className="h-auto min-w-[150px]">
      <div className="relative min-h-40 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-md object-cover"
        />

        <div className="absolute left-2 top-2">
          <div className="flex items-center rounded-xl bg-button px-1 py-0.5 text-xs font-semibold text-white">
            <ArrowDown size={12} />
            <span>{product.discountPercentage}%</span>
          </div>
        </div>
      </div>
      <div className="pt-2">
        <h2 className="truncate text-sm text-[#323232]">{product.name}</h2>
        {product.discountPercentage > 0 ? (
          <p className="flex items-center gap-1">
            {formatPrice(
              Number(
                calculateDiscountProduct({
                  ...product,
                  originalPrice: Number(product.originalPrice),
                }),
              ),
            )}
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(Number(product.originalPrice))}
            </span>
          </p>
        ) : (
          <p className="font-semibold">
            {formatPrice(Number(product.originalPrice))}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </p>
      </div>
    </Link>
  );
};
