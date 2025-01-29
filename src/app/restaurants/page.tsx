import { getRestaurants } from "@/actions/get-restaurants";
import { Header } from "../_components/header";
import { SearchRestaurant } from "../(main)/_components/search-restaurant";
import { RestaurantItem } from "../_components/restaurant-item";
import { Separator } from "@/components/ui/separator";

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
      <div className="hidden pb-10 pt-5 md:block">
        <Separator />
      </div>
      <section className="px-5 pt-6 md:px-32 md:pt-0">
        <SearchRestaurant />
      </section>
      <section className="px-5 pt-6 md:px-32 md:pt-10">
        {restaurantName && (
          <p className="text-xs text-muted-foreground md:text-xl md:font-semibold md:text-[#323232]">
            Resultados para "{restaurantName}"
          </p>
        )}

        <div className="mt-3 flex flex-col gap-4 md:mt-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem restaurant={restaurant} key={restaurant.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default RestaurantsPage;
