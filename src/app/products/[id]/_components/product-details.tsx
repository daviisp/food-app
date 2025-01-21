"use client";

import Image from "next/image";
import { ProductBanner } from "./product-banner";
import { calculateDiscountProduct, formatPrice } from "@/helpers/price";
import { ArrowDown, ChevronLeft, ChevronRight, TrashIcon } from "lucide-react";
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
import { ProductItem } from "@/app/_components/product-item";

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
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Começa com 1 em vez de 0, já que 0 não faz sentido para quantidade de produto

  const cart = useCart();

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    cart.addToCart({ ...product, quantity });
    setCartIsOpen(true);
  };

  const showPriceWithDiscountAndQuantity = () => {
    const discount = calculateDiscountProduct(product);
    const totalPrice = discount * quantity;
    return formatPrice(totalPrice);
  };

  const renderProductDetails = () => (
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
              size="icon"
              className="rounded-lg border border-[#EEE] bg-white text-black hover:bg-white"
              onClick={decreaseQuantity}
            >
              <ChevronLeft />
            </Button>
            <span>{quantity}</span>
            <Button
              size="icon"
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
    </>
  );

  const renderProductCategories = () => (
    <div className="pt-6">
      {product.restaurant.categories.slice(2, 3).map((category) => (
        <div key={category.id}>
          <h2 className="pb-4 font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="relative h-[370px] w-full">
        <ProductBanner product={product} />
      </div>
      <div className="absolute z-50 mt-[-15px] w-full rounded-tl-3xl rounded-tr-3xl bg-white p-5">
        {renderProductDetails()}
        <div className="pt-6">
          <RestaurantDeliveryInfo restaurant={product.restaurant} />
        </div>
        <div className="space-y-3 pt-6">
          <h2 className="font-semibold text-[#323232]">Sobre</h2>
          <p className="text-justify text-muted-foreground">
            {product.description}
          </p>
        </div>
        {renderProductCategories()}
        <div className="w-full pb-5 pt-6">
          <Button
            className="w-full rounded-lg bg-button px-4 py-3 text-sm font-semibold hover:bg-button/70"
            onClick={handleAddToCart}
          >
            Adicionar à sacola
          </Button>
        </div>
      </div>

      <Sheet open={cartIsOpen} onOpenChange={setCartIsOpen}>
        <SheetContent className="w-10/12">
          <SheetHeader>
            <SheetTitle className="mb-6 text-left">Sacola</SheetTitle>
          </SheetHeader>
          {cart.products.length > 0 &&
            cart.products.map((prod) => (
              <div key={prod.id} className="flex h-full flex-col">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <div>
                        <Image
                          src={prod.imageUrl}
                          width={110}
                          height={110}
                          alt={prod.name}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div>
                          <h2 className="mb-1 text-xs text-[#323232]">
                            {prod.name}
                          </h2>
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-semibold">
                              {showPriceWithDiscountAndQuantity()}
                            </p>
                            <p className="text-xs text-muted-foreground line-through">
                              {formatPrice(prod.originalPrice * prod.quantity)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-1.5 space-x-2.5">
                          <Button
                            size="icon"
                            className="h-8 w-8 rounded-lg border border-[#EEE] bg-white text-black hover:bg-white"
                            onClick={decreaseQuantity}
                          >
                            <ChevronLeft size={16} />
                          </Button>
                          <span className="text-sm">{quantity}</span>
                          <Button
                            size="icon"
                            className="h-8 w-8 rounded-lg bg-button hover:bg-button"
                            onClick={incrementQuantity}
                          >
                            <ChevronRight size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <TrashIcon />
                    </div>
                  </div>
                </div>
                <div className="mb-8">preço</div>
              </div>
            ))}
        </SheetContent>
      </Sheet>
    </>
  );
};
