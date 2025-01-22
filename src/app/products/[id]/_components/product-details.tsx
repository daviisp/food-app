"use client";

import Image from "next/image";
import { ProductBanner } from "./product-banner";
import {
  calculateDiscountProduct,
  calculateDiscountProductWithQuantity,
  formatPrice,
} from "@/helpers/price";
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
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";

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
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const cart = useCart();

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const hasDifferentRestaurant = cart.products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurant) {
      return setAlertDialogOpen(true);
    }

    cart.addToCart({ ...product, quantity });
    setCartIsOpen(true);
    toast.success("Produto adicionado com sucesso!");
  };

  const handleClearCartAndAddToCart = () => {
    cart.clearCart();
    handleAddToCart();
  };

  const handleRemoveFromCart = () => {
    cart.removeFromCart(product.id);
    toast.success("Produto removido com sucesso!");
  };

  const handleIncreaseProductQuantity = () => {
    cart.increaseQuantity(product.id);
  };
  const handleDecreaseProductQuantity = () => {
    cart.decreaseQuantity(product.id);
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
          <div className="flex flex-col space-y-4 overflow-y-scroll">
            {cart.products.length > 0 &&
              cart.products.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md"
                >
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
                            {formatPrice(
                              calculateDiscountProductWithQuantity({
                                ...prod,
                                originalPrice: Number(prod.originalPrice),
                                quantity: prod.quantity,
                              }),
                            )}
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
                          onClick={handleDecreaseProductQuantity}
                        >
                          <ChevronLeft size={16} />
                        </Button>
                        <span className="text-sm">{prod.quantity}</span>
                        <Button
                          size="icon"
                          className="h-8 w-8 rounded-lg bg-button hover:bg-button"
                          onClick={handleIncreaseProductQuantity}
                        >
                          <ChevronRight size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" onClick={handleRemoveFromCart}>
                      <TrashIcon size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            <div className="pt-56">
              <Card>
                <CardContent className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    <p>Subtotal</p>
                    <p>Entrega</p>
                    <p>Descontos</p>
                    <p className="text-base font-semibold text-black">Total</p>
                  </div>
                  <div className="text-[#323232]">
                    <p>{cart.totalPriceOfAllProductsWithoutDiscount()}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          </AlertDialogHeader>
          <p>
            Ao adicionar esse produto, o seu carrinho será zerado e o produto
            será adicionado!
          </p>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClearCartAndAddToCart}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
