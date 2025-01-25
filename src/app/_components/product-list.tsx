import { Prisma, Product } from "@prisma/client";
import { ProductItem } from "./product-item";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem
          product={{ ...product, originalPrice: Number(product.originalPrice) }}
          key={product.id}
        />
      ))}
    </div>
  );
};
