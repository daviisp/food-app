import { getFavoriteRestaurantsByUser } from "@/actions/get-favorite-restaurants-by-user";
import { getRestaurants } from "@/actions/get-restaurants";
import { RestaurantList } from "@/app/_components/restaurant-list";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const RecommendedRestaurants = async () => {
  const [restaurants, userFavoritesRestaurants] = await Promise.all([
    getRestaurants({}),
    getFavoriteRestaurantsByUser(),
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#323232] md:text-lg">
          Restaurantes Recomendados
        </h2>
        <Button
          variant="ghost"
          className="hover:text-[#EA1D2C]/ w-fit gap-0 p-0 text-xs text-[#EA1D2C] hover:bg-transparent md:text-sm"
          asChild
        >
          <Link href="/restaurants">
            Ver todos
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>
      <div>
        <RestaurantList
          restaurants={restaurants}
          favoritesRestaurantsByUser={userFavoritesRestaurants!}
        />
      </div>
    </div>
  );
};
