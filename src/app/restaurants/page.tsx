import { getRestaurants } from "@/actions/get-restaurants";
import { Header } from "../_components/header";
import { SearchRestaurant } from "../(main)/_components/search-restaurant";
import Image from "next/image";
import { RestaurantItem } from "../_components/restaurant-item";

interface RestaurantPageParams {
  searchParams: Promise<{ restaurantName: string }>;
}

const RestaurantsPage = async ({ searchParams }: RestaurantPageParams) => {
  const restaurantName = (await searchParams).restaurantName;
  const restaurants = await getRestaurants({
    restaurantName: restaurantName ? restaurantName : undefined,
  });

  return (
    <>
      <Header />
      <section className="px-5 pt-6">
        <SearchRestaurant />
      </section>
      <section className="px-5 pt-6">
        {restaurantName && (
          <p className="text-xs text-muted-foreground">
            Resultados para "{restaurantName}"
          </p>
        )}

        <div className="mt-3 flex flex-col gap-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem restaurant={restaurant} key={restaurant.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default RestaurantsPage;
