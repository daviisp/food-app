import { ProductList } from "@/app/_components/product-list";
import { Prisma } from "@prisma/client";

interface CategoryWithProductsProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: {
        include: {
          products: {
            include: {
              restaurant: true;
            };
          };
        };
      };
    };
  }>;
}

export const CategoryWithProducts = ({
  restaurant,
}: CategoryWithProductsProps) => {
  return (
    <>
      {restaurant.categories.slice(0, 1).map((category) => (
        <div key={category.id}>
          <h2 className="pb-4 font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
    </>
  );
};
