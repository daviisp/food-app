"use client";

import { createOrder } from "@/actions/create-order";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/cart";
import {
  calculateDiscountProductWithQuantity,
  formatPrice,
} from "@/helpers/price";
import { toast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, TrashIcon } from "lucide-react";
import Image from "next/image";

export const ShowTotalProductsInCart = () => {
  const cart = useCart();

  const handleIncreaseProductQuantity = (productId: string) => {
    cart.increaseQuantity(productId);
  };
  const handleDecreaseProductQuantity = (productId: string) => {
    cart.decreaseQuantity(productId);
  };

  const handleRemoveFromCart = (productId: string) => {
    try {
      cart.removeFromCart(productId);
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

  return (
    <>
      {cart.products.length > 0 && (
        <div className="flex items-center gap-12 px-32 pb-5 pt-3">
          <div>
            <p className="text-sm text-muted-foreground">Total sem entrega</p>
            <div className="flex items-center gap-1">
              <p className="text-lg font-semibold">
                {formatPrice(cart.totalDiscounts)}
              </p>
              <span className="text-xs text-muted-foreground">
                {" "}
                / {cart.products.length}
                {cart.products.length > 1 ? " itens" : " item"}
              </span>
            </div>
          </div>
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="rounded-lg bg-button px-12 py-3 font-semibold hover:bg-button">
                  Ver sacola
                </Button>
              </SheetTrigger>
              <SheetContent className="w-11/12 overflow-y-auto p-3">
                <SheetHeader>
                  <SheetTitle className="mb-6 px-2 text-left">
                    Sacola
                  </SheetTitle>
                </SheetHeader>
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
                                  {formatPrice(
                                    prod.originalPrice * prod.quantity,
                                  )}
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
                              <span className="w-10 text-sm">
                                {prod.quantity}
                              </span>
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
                          <Button
                            variant="ghost"
                            onClick={() => handleRemoveFromCart(prod.id)}
                          >
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
                                <p className="text-muted-foreground">
                                  Descontos
                                </p>
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
              </SheetContent>
            </Sheet>
          </div>
        </div>
      )}
    </>
  );
};
