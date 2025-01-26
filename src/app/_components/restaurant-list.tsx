import { Restaurant, UserFavoritesRestaurants } from "@prisma/client";
import { RestaurantItem } from "./restaurant-item";
import { auth } from "@/lib/auth";

interface RestaurantListProps {
  restaurants: Restaurant[];
  favoritesRestaurantsByUser?: UserFavoritesRestaurants[];
}

export const RestaurantList = async ({
  restaurants,
  favoritesRestaurantsByUser,
}: RestaurantListProps) => {
  const session = await auth();

  return (
    <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          restaurant={restaurant}
          key={restaurant.id}
          favoritesRestaurantsByUser={favoritesRestaurantsByUser}
          user={session?.user}
        />
      ))}
    </div>
  );
};
