import { getRestaurantsRecommeded } from "@/actions/get-restaurants-recommended";
import { RestaurantList } from "@/app/_components/restaurant-list";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const RecommendedRestaurants = async () => {
  const restaurants = await getRestaurantsRecommeded();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#323232]">
          Restaurantes Recomendados
        </h2>
        <Button
          variant="ghost"
          className="hover:text-[#EA1D2C]/ w-fit gap-0 p-0 text-xs text-[#EA1D2C] hover:bg-transparent"
        >
          Ver todos
          <ChevronRight size={16} />
        </Button>
      </div>
      <div>
        <RestaurantList restaurants={restaurants} />
      </div>
    </div>
  );
};
