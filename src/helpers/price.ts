import { Product } from "@prisma/client";

interface ProductWithNumberPrice extends Omit<Product, "originalPrice"> {
  originalPrice: number;
}

interface ProductWithQuantity extends Omit<Product, "originalPrice"> {
  originalPrice: number;
  quantity: number;
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export const calculateDiscountProduct = (product: ProductWithNumberPrice) => {
  const discount =
    (Number(product.originalPrice) * product.discountPercentage) / 100;

  return Number(product.originalPrice) - discount;
};

export const calculateDiscountProductWithQuantity = ({
  originalPrice,
  discountPercentage,
  quantity,
}: ProductWithQuantity) => {
  const discount = (Number(originalPrice) * discountPercentage) / 100;

  return (Number(originalPrice) - discount) * quantity;
};
