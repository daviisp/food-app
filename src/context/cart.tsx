"use client";

import { formatPrice } from "@/helpers/price";
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
  totalPriceOfAllProductsWithoutDiscount: () => string;
  decreaseQuantity: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalPriceOfAllProductsWithoutDiscount: () => "",
  decreaseQuantity: () => {},
  increaseQuantity: () => {},
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const clearCart = () => {
    setProducts([]);
  };
  const addToCart = (product: CartProduct) => {
    setProducts((currentState) => {
      const productAlreadyInState = currentState.find(
        (prod) => prod.id === product.id,
      );

      if (productAlreadyInState) {
        return currentState.map((prod) =>
          prod.id === product.id
            ? { ...prod, quantity: prod.quantity + product.quantity }
            : prod,
        );
      }

      // Se o produto não estiver no carrinho, adicione-o com quantity igual a 1
      return [...currentState, { ...product, quantity: product.quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setProducts((currentState) =>
      currentState.filter((prod) => prod.id !== productId),
    );
  };

  const totalPriceOfAllProductsWithoutDiscount = () => {
    const totalPriceOfProducts = products.reduce((acc, product) => {
      return acc + product.originalPrice * product.quantity;
    }, 0);

    return formatPrice(totalPriceOfProducts);
  };

  const decreaseQuantity = (productId: string) => {
    setProducts((currentState) =>
      currentState.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: Math.max(product.quantity - 1, 1),
          };
        }
        return product;
      }),
    );
  };

  const increaseQuantity = (productId: string) => {
    setProducts((currentState) =>
      currentState.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      }),
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        clearCart,
        addToCart,
        removeFromCart,
        totalPriceOfAllProductsWithoutDiscount,
        decreaseQuantity,
        increaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
