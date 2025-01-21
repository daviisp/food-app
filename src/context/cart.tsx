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
      // Verifica se o produto já está no carrinho
      const productAlreadyInState = currentState.some(
        (prod) => prod.id === product.id,
      );

      if (productAlreadyInState) {
        // Se o produto já estiver no carrinho, aumente a quantidade em 1
        return currentState.map((prod) =>
          prod.id === product.id
            ? { ...prod, quantity: prod.quantity + product.quantity } // Incrementa a quantidade
            : prod,
        );
      }

      // Se o produto não estiver no carrinho, adicione-o com quantity igual a 1
      return [...currentState, { ...product, quantity: product.quantity }];
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
