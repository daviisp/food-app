"use client";

import { Prisma } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

export interface CartProduct
  extends Omit<
    Prisma.ProductGetPayload<{
      include: {
        restaurant: true;
      };
    }>,
    "originalPrice"
  > {
  originalPrice: number;
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const clearCart = () => {
    return setProducts([]);
  };

  const addToCart = (product: CartProduct) => {
    setProducts((currentState) => {
      const productAlreadyInState = currentState.some(
        (prod) => prod.id === product.id,
      );

      if (productAlreadyInState) {
        return currentState.map((prod) =>
          prod.id === product.id
            ? { ...prod, quantity: prod.quantity + product.quantity }
            : prod,
        );
      }

      return [...currentState, { ...product, quantity: product.quantity }];
    });
  };

  const removeFromCart = () => {};

  return (
    <CartContext.Provider
      value={{ products, clearCart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
