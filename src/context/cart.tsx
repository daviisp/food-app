"use client";

import { Prisma } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

interface CartProduct
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
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addToCart = (product: CartProduct) => {
    setProducts((currentState) => {
      return [...currentState, product];
    });
  };

  const removeFromCart = () => {};

  return (
    <CartContext.Provider value={{ products, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
