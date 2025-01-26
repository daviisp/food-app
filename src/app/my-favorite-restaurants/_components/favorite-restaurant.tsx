"use client";

import { toggleFavoriteRestaurant } from "@/actions/toggleFavoriteRestaurant";
import { toast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

interface ToggleRestaurantFavoriteProps {
  restaurantId: string;
}

export const FavoriteRestaurant = ({
  restaurantId,
}: ToggleRestaurantFavoriteProps) => {
  const handleToggleFavoriteRestaurant = async () => {
    try {
      await toggleFavoriteRestaurant(restaurantId);
      toast({
        title: "Sucesso",
        description: "Restaurante removido dos favoritos com sucesso!",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro",
        description: "Algum erro aconteceu. Tente novamente",
      });
    }
  };

  return (
    <div
      onClick={handleToggleFavoriteRestaurant}
      className="absolute right-2 top-2 h-7 w-7 rounded-full bg-white text-center"
    >
      <div className="flex h-full items-center justify-center">
        <Heart size={16} fill="#EA1B2C" className="text-[#EA1B2C]" />
      </div>
    </div>
  );
};
