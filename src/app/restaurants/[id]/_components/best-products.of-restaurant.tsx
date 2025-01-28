import { ProductList } from "@/app/_components/product-list";
import { Prisma } from "@prisma/client";

interface BestProductsOfRestaurantProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      products: {
        include: {
          restaurant: true;
        };
      };
    };
  }>;
}

export const BestProductsOfRestaurant = ({
  restaurant,
}: BestProductsOfRestaurantProps) => {
  return (
    <>
      <h2 className="pb-4 font-semibold md:text-lg">Mais Pedidos</h2>
      <ProductList products={restaurant.products} />
    </>
  );
};
