import { Restaurant, UserFavoritesRestaurants } from "@prisma/client";
import { RestaurantItem } from "./restaurant-item";

interface RestaurantListProps {
  restaurants: Restaurant[];
  favoritesRestaurantsByUser?: UserFavoritesRestaurants[];
}

export const RestaurantList = ({
  restaurants,
  favoritesRestaurantsByUser,
}: RestaurantListProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          restaurant={restaurant}
          key={restaurant.id}
          favoritesRestaurantsByUser={favoritesRestaurantsByUser}
        />
      ))}
    </div>
  );
};
