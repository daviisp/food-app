"use client";

import { toggleFavoriteRestaurant } from "@/actions/toggleFavoriteRestaurant";
import { formatPrice } from "@/helpers/price";
import { Restaurant, UserFavoritesRestaurants } from "@prisma/client";
import { BikeIcon, Heart, Star, TimerIcon } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface RestaurantItemProps {
  restaurant: Restaurant;
  favoritesRestaurantsByUser?: UserFavoritesRestaurants[];
  user?: Session["user"];
}

export const RestaurantItem = ({
  restaurant,
  favoritesRestaurantsByUser,
  user,
}: RestaurantItemProps) => {
  const { toast } = useToast();

  const isFavorite = favoritesRestaurantsByUser?.some(
    (favorite) => favorite.restaurantId === restaurant.id,
  );

  const handleFavoriteRestaurant = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await toggleFavoriteRestaurant(restaurant.id);
      toast({
        title: "Sucesso",
        description: `Restaurante ${isFavorite ? "adicionado aos favoritos!" : "removido dos favoritos!"}`,
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
    <Link
      href={`/restaurants/${restaurant.id}`}
      className="h-auto min-w-[226px]"
    >
      <div className="relative min-h-[136px] w-full md:min-h-[165px]">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-md object-cover"
        />
        <div className="absolute left-2 top-2">
          <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1">
            <Star size={16} fill="#FFB100" className="text-[#FFB100]" />
            <span className="text-xs font-semibold text-[#323232]">5.0</span>
          </div>
        </div>
        {user && (
          <div
            onClick={handleFavoriteRestaurant}
            className={`absolute right-2 top-2 h-7 w-7 rounded-full ${isFavorite ? "bg-white" : "bg-[#3C3C3C]"} text-center`}
          >
            <div className="flex h-full items-center justify-center">
              <Heart
                size={16}
                fill={isFavorite ? "#EA1B2C" : "#FFF"}
                className={isFavorite ? "text-[#EA1B2C]" : "text-[#FFF]"}
              />
            </div>
          </div>
        )}
      </div>
      <div className="pt-3">
        <h2 className="text-sm font-semibold text-[#323232]">
          {restaurant.name}
        </h2>
        <div className="flex items-center gap-3 text-xs text-[#7E8392]">
          <div className="flex items-center gap-1.5">
            <BikeIcon size={16} fill="#EA1D2C" className="text-[#EA1D2C]" />
            {Number(restaurant.deliveryFee) === 0 ? (
              <span>Entrega Grátis</span>
            ) : (
              <span>{formatPrice(Number(restaurant.deliveryFee))}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <TimerIcon size={16} fill="#EA1D2C" className="text-[#EA1D2C]" />
            <span>{restaurant.deliveryTime}min</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
