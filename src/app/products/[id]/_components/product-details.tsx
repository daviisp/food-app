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
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createOrder } from "@/actions/create-order";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  const { toast } = useToast();

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
    toast({
      title: "Sucesso",
      description: "Produto adicionado no carrinho com sucesso!",
    });
  };

  const handleClearCartAndAddToCart = () => {
    cart.clearCart();
    cart.addToCart({ ...product, quantity });
    setCartIsOpen(true);
    toast({
      title: "Sucesso",
      description: "Produto adicionado ao carrinho com sucesso!",
    });
  };

  const handleRemoveFromCart = () => {
    try {
      cart.removeFromCart(product.id);
      toast({
        title: "Sucesso",
        description: "Produto removido com sucesso!",
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o produto do carrinho",
      });
    }
  };

  const handleIncreaseProductQuantity = (productId: string) => {
    cart.increaseQuantity(productId);
  };
  const handleDecreaseProductQuantity = (productId: string) => {
    cart.decreaseQuantity(productId);
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
        <p className="text-xs text-[#7E8392] md:text-sm">
          {product.restaurant.name}
        </p>
      </div>
      <p className="mt-1 block font-semibold md:text-xl">{product.name}</p>
      <div className="pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <p className="text-lg font-semibold md:text-xl">
              {formatPrice(calculateDiscountProduct(product))}
            </p>
            <div className="flex items-center justify-center rounded-full bg-button p-1 text-xs font-semibold text-white md:text-sm">
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

  const handleFinishedOrder = async () => {
    try {
      await createOrder({
        products: cart.products,
        restaurantId: cart.products[0].restaurantId,
      });
      cart.clearCart();
      toast({
        title: "Sucesso",
        description: "Pedido feito com sucesso!",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Erro",
        description: "Algum erro aconteceu. Tente novamente",
        variant: "destructive",
      });
    }
  };

  const renderProductCategories = () => (
    <div className="pt-6">
      {product.restaurant.categories.slice(2, 3).map((category) => (
        <div key={category.id}>
          <h2 className="pb-4 font-semibold md:text-lg">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="relative h-[370px] w-full md:hidden">
        <ProductBanner product={product} />
      </div>
      <div className="absolute z-50 mt-[-15px] w-full rounded-tl-3xl rounded-tr-3xl bg-white p-5 md:hidden">
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
            disabled={!session}
          >
            {!session ? (
              <span>Faça Login</span>
            ) : (
              <span>Adicionar à sacola</span>
            )}
          </Button>
        </div>
      </div>
      <>
        <div className="hidden gap-8 px-32 md:flex">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={500}
            className="h-[500px] w-[600px] rounded-lg object-cover"
          />
          <div className="w-full rounded-lg border border-[#EEE] p-10">
            <div>{renderProductDetails()}</div>
            <div className="pt-6">
              <RestaurantDeliveryInfo restaurant={product.restaurant} />
            </div>
            <div className="space-y-3 pt-6">
              <h3 className="font-semibold text-[#323232]">Sobre</h3>
              <p className="text-justify text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
            <div className="mt-6">
              <Button
                className="w-full bg-button text-sm font-semibold text-white hover:bg-button"
                onClick={handleAddToCart}
              >
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      </>
      <div className="hidden px-32 pt-10 md:block">
        {renderProductCategories()}
      </div>

      <Sheet open={cartIsOpen} onOpenChange={setCartIsOpen}>
        <SheetContent className="w-11/12 overflow-y-auto p-3">
          <SheetHeader>
            <SheetTitle className="mb-6 px-2 text-left">Sacola</SheetTitle>
          </SheetHeader>
          {cart.products.length > 0 ? (
            <div className="flex flex-col space-y-4 overflow-y-auto">
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
                          className="min-h-[110px] min-w-[110px] rounded-lg object-cover"
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
                        <div className="w-22 mt-1.5 space-x-2.5">
                          <Button
                            size="icon"
                            className="h-8 w-8 rounded-lg border border-[#EEE] bg-white text-black hover:bg-white"
                            onClick={() =>
                              handleDecreaseProductQuantity(prod.id)
                            }
                          >
                            <ChevronLeft size={16} />
                          </Button>
                          <span className="w-10 text-sm">{prod.quantity}</span>
                          <Button
                            size="icon"
                            className="h-8 w-8 rounded-lg bg-button hover:bg-button"
                            onClick={() =>
                              handleIncreaseProductQuantity(prod.id)
                            }
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
              <div className="pt-32">
                {cart.products.length > 0 && (
                  <>
                    <Card className="overflow-hidden">
                      <CardContent className="space-y-4 p-5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="text-muted-foreground">
                            <p>Subtotal</p>
                          </div>
                          <div>
                            <p className="text-[#323232]">
                              {formatPrice(
                                cart.totalPriceOfAllProductsWithoutDiscount,
                              )}
                            </p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <p className="text-muted-foreground">Entrega</p>
                          </div>
                          <div>
                            <p className="uppercase text-[#EA1D2C]">
                              {cart.deliveryFeeOfRestaurant === 0
                                ? "Grátis"
                                : formatPrice(
                                    Number(cart.deliveryFeeOfRestaurant),
                                  )}
                            </p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <p className="text-muted-foreground">Descontos</p>
                          </div>
                          <div>
                            <p className="text-[#323232]">
                              {formatPrice(cart.totalDiscounts)}
                            </p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between text-sm font-semibold text-black">
                          <div>
                            <p>Total</p>
                          </div>
                          <div>
                            <p>{formatPrice(cart.totalPrice)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Button
                      className="mt-6 w-full bg-button font-bold"
                      onClick={handleFinishedOrder}
                    >
                      Finalizar Pedido
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <p className="px-2">Seu carrinho está vazio.</p>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Você tem certeza?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-center">
            Ao adicionar esse produto, o seu carrinho será zerado e o produto
            será adicionado!
          </AlertDialogDescription>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClearCartAndAddToCart}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
