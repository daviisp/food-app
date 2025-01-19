import { getRestaurant } from "@/actions/get-restaurant";
import { notFound } from "next/navigation";
import { RestaurantBanner } from "./_components/restaurant-banner";
import { RestaurantInfo } from "./_components/restaurant-info";
import { BestProductsOfRestaurant } from "./_components/best-products.of-restaurant";
import { CategoryWithProducts } from "../../_components/category-with-products";

interface RestaurantPageParams {
  params: Promise<{ id: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageParams) => {
  const id = (await params).id;
  const restaurant = await getRestaurant({ id });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="overflow-x-hidden">
      <section className="relative min-h-52 w-full">
        <RestaurantBanner restaurant={restaurant} />
      </section>
      <section className="relative z-50 mt-[-1rem] w-full rounded-tl-3xl rounded-tr-3xl bg-white px-5">
        <RestaurantInfo restaurant={restaurant} />
        <section className="overflow-x-auto pt-8 [&::-webkit-scrollbar]:hidden">
          <BestProductsOfRestaurant restaurant={restaurant} />
        </section>
        <section className="flex gap-4 overflow-x-auto pt-8 [&::-webkit-scrollbar]:hidden">
          <CategoryWithProducts restaurant={restaurant} />
        </section>
      </section>
    </div>
  );
};

export default RestaurantPage;
