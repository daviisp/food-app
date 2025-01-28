import { formatPrice } from "@/helpers/price";
import { Restaurant } from "@prisma/client";
import { BikeIcon, Timer } from "lucide-react";

interface RestaurantDeliveryInfoProps {
  restaurant: Restaurant;
}

export const RestaurantDeliveryInfo = ({
  restaurant,
}: RestaurantDeliveryInfoProps) => {
  return (
    <div className="rounded-lg border border-[#F4F4F4] bg-white px-12 py-2.5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center justify-center gap-0.5 text-xs text-[#7E8392] md:text-sm">
          <div className="flex items-center gap-1">
            Entrega
            <BikeIcon size={16} />
          </div>
          <div className="text-sm font-semibold text-black">
            {Number(restaurant.deliveryFee) === 0 ? (
              <p>Grátis</p>
            ) : (
              <p>{formatPrice(Number(restaurant.deliveryFee))}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5 text-xs text-[#7E8392] md:text-sm">
          <div className="flex items-center gap-1">
            Entrega
            <Timer size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-black">
              {restaurant.deliveryTime} min
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
