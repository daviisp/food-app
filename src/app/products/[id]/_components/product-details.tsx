"use client";

import Image from "next/image";
import { ProductBanner } from "./product-banner";
import { calculateDiscountProduct, formatPrice } from "@/helpers/price";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RestaurantDeliveryInfo } from "@/app/_components/restaurant-delivery-info";
import { Prisma } from "@prisma/client";
import { ProductList } from "@/app/_components/product-list";
import { useCart } from "@/context/cart";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ProductDetailsProps {
  product: Omit<
    Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          include: {
            categories: {
              include: {
                products: {
                  include: {
                    restaurant: true;
                  };
                };
              };
            };
          };
        };
      };
    }>,
    "originalPrice"
  > & {
    originalPrice: number;
  };
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [cartIsOpen, setCartIsOpen] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const cart = useCart();

  const incrementQuantity = () => {
    return setQuantity((currentState) => currentState + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((currentState) => {
      if (currentState === 0) {
        return currentState;
      }
      return currentState - 1;
    });
  };

  const handleAddToCart = () => {
    cart.addToCart({ ...product, quantity });
  };

  return (
    <>
      <div className="relative h-[370px] w-full">
        <ProductBanner product={product} />
      </div>
      <div className="absolute z-50 mt-[-15px] w-full rounded-tl-3xl rounded-tr-3xl bg-white p-5">
        <div>
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
                  onClick={decreaseQuantity}
                >
                  <ChevronLeft />
                </Button>
                <span>{quantity}</span>
                <Button
                  size={"icon"}
                  className="rounded-lg bg-button hover:bg-button"
                  onClick={incrementQuantity}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              De: {formatPrice(Number(product.originalPrice))}
            </p>
          </div>
        </div>
        <div className="pt-6">
          <RestaurantDeliveryInfo restaurant={product.restaurant} />
        </div>
        <div className="space-y-3 pt-6">
          <h2 className="font-semibold text-[#323232]">Sobre</h2>
          <p className="text-justify text-muted-foreground">
            {product.description}
          </p>
        </div>
        <div className="pt-6">
          {product.restaurant.categories.slice(2, 3).map((category) => (
            <div key={category.id}>
              <h2 className="pb-4 font-semibold">{category.name}</h2>
              <ProductList products={category.products} />
            </div>
          ))}
        </div>
        <div className="w-full pb-5 pt-6">
          <Button className="w-full rounded-lg bg-button px-4 py-3 text-sm font-semibold hover:bg-button/70">
            Adicionar à sacola
          </Button>
        </div>
      </div>

      <Sheet open={cartIsOpen} onOpenChange={setCartIsOpen}>
        <SheetContent className="w-10/12">
          <SheetHeader>
            <SheetTitle className="text-left">Carrinho</SheetTitle>
          </SheetHeader>
          ola mundo
        </SheetContent>
      </Sheet>
    </>
  );
};
