import { formatPrice } from "@/helpers/price";
import { Prisma } from "@prisma/client";
import { BikeIcon, Star, Timer } from "lucide-react";
import Image from "next/image";

interface RestaurantInfoProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true;
    };
  }>;
}

export const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  return (
    <div className="space-y-3 pt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            width={30}
            height={30}
            className="rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-[#323232] px-2.5 py-1 text-xs font-semibold text-white">
          <Star size={16} fill="#FFB100" className="text-[#FFB100]" />
          <span>5.0</span>
        </div>
      </div>
      <div className="rounded-lg border border-[#F4F4F4] bg-white px-12 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-0.5 text-xs text-[#7E8392]">
            <div className="flex items-center gap-1">
              Entrega
              <BikeIcon size={16} />
            </div>
            <div className="font-semibold text-black">
              {Number(restaurant.deliveryFee) === 0 ? (
                <p>Grátis</p>
              ) : (
                <p>{formatPrice(Number(restaurant.deliveryFee))}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.5 text-xs text-[#7E8392]">
            <div className="flex items-center gap-1">
              Entrega
              <Timer size={16} />
            </div>
            <div>
              <p className="font-semibold text-black">
                {restaurant.deliveryTime} min
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {restaurant.categories.slice(0, 2).map((category) => (
          <div
            key={category.id}
            className="rounded-md bg-[#F4F4F5] px-1.5 py-1 text-center text-xs text-[#7E8392]"
          >
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
