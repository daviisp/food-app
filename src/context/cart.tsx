"use client";

import { Prisma } from "@prisma/client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

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
  totalPriceOfAllProductsWithoutDiscount: number;
  deliveryFeeOfRestaurant: number | false;
  totalDiscounts: number;
  totalPrice: number;
  decreaseQuantity: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalPriceOfAllProductsWithoutDiscount: 0,
  deliveryFeeOfRestaurant: 0,
  totalDiscounts: 0,
  totalPrice: 0,
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

      return [...currentState, { ...product, quantity: product.quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setProducts((currentState) =>
      currentState.filter((prod) => prod.id !== productId),
    );
  };

  const totalPriceOfAllProductsWithoutDiscount = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.originalPrice;
    }, 0);
  }, [products]);

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

  const deliveryFeeOfRestaurant =
    products.length > 0 && Number(products[0].restaurant.deliveryFee);

  const totalDiscounts = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + (product.originalPrice * product.discountPercentage) / 100;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return (
      products.reduce((acc, product) => {
        const totalPrice = product.originalPrice * product.quantity;
        const totalDiscounts =
          (product.originalPrice *
            product.discountPercentage *
            product.quantity) /
          100;

        return acc + (totalPrice - totalDiscounts);
      }, 0) + Number(products[0]?.restaurant?.deliveryFee)
    );
  }, [products]);

  return (
    <CartContext.Provider
      value={{
        products,
        clearCart,
        addToCart,
        removeFromCart,
        totalPriceOfAllProductsWithoutDiscount,
        deliveryFeeOfRestaurant,
        decreaseQuantity,
        increaseQuantity,
        totalDiscounts,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
