import { BackButton } from "@/app/_components/back-button";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";

interface RestarantBannerProps {
  restaurant: Restaurant;
}

export const RestaurantBanner = ({ restaurant }: RestarantBannerProps) => {
  return (
    <>
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <div className="absolute left-4 top-4">
        <BackButton />
      </div>
      <div className="absolute right-4 top-4">
        <Button className="h-8 w-8 rounded-full bg-[#3C3C3C] p-2.5">
          <Heart size={24} fill="#FFF" className="text-[#FFF]" />
        </Button>
      </div>
    </>
  );
};
