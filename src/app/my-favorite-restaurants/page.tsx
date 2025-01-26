import { getFavoriteRestaurantsByUser } from "@/actions/get-favorite-restaurants-by-user";
import { Header } from "../_components/header";
import Image from "next/image";
import { BikeIcon, Star, TimerIcon } from "lucide-react";
import { FavoriteRestaurant } from "./_components/favorite-restaurant";
import { formatPrice } from "@/helpers/price";

const MyFavoriteRestaurants = async () => {
  const favoriteRestaurants = await getFavoriteRestaurantsByUser();

  return (
    <>
      <Header />
      <section className="px-5">
        <h2 className="py-6 text-lg font-semibold text-[#323232]">
          Meus Restaurantes
        </h2>
        <div className="space-y-6">
          {favoriteRestaurants?.length === 0 ? (
            <p className="text-muted-foreground">
              Você ainda não tem nenhum restaurante marcado como favorito.
            </p>
          ) : (
            favoriteRestaurants?.map((favoriteRestaurant) => (
              <div className="h-[187px] w-full" key={favoriteRestaurant.id}>
                <div className="relative h-[136px] w-full">
                  <Image
                    src={favoriteRestaurant.restaurant.imageUrl}
                    alt={favoriteRestaurant.restaurant.name}
                    fill
                    className="rounded-lg object-cover"
                  />

                  <div className="absolute left-2 top-2">
                    <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1">
                      <Star
                        size={16}
                        fill="#FFB100"
                        className="text-[#FFB100]"
                      />
                      <span className="text-xs font-semibold text-[#323232]">
                        5.0
                      </span>
                    </div>
                  </div>
                  <div className="absolute right-2 top-2">
                    <FavoriteRestaurant
                      restaurantId={favoriteRestaurant.restaurant.id}
                    />
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className="text-sm font-semibold text-[#323232]">
                    {favoriteRestaurant.restaurant.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <BikeIcon
                        size={16}
                        fill="#EA1D2C"
                        className="text-[#EA1D2C]"
                      />
                      {Number(favoriteRestaurant.restaurant.deliveryFee) ===
                      0 ? (
                        <span className="text-sm text-[#7E8392]">
                          Entrega Grátis
                        </span>
                      ) : (
                        <span className="text-sm text-[#7E8392]">
                          {formatPrice(
                            Number(favoriteRestaurant.restaurant.deliveryFee),
                          )}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TimerIcon
                        size={16}
                        fill="#EA1D2C"
                        className="text-[#EA1D2C]"
                      />
                      <span className="text-sm text-[#7E8392]">
                        {favoriteRestaurant.restaurant.deliveryTime}min
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default MyFavoriteRestaurants;
