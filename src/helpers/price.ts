import { Product } from "@prisma/client";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export const calculateDiscountProduct = (product: Product) => {
  const discount =
    (Number(product.originalPrice) * product.discountPercentage) / 100;

  return Number(product.originalPrice) - discount;
};
