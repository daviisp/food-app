"use server";

import { prisma } from "@/lib/prisma";

interface GetRestaurantsProps {
  restaurantName?: string;
}

export const getRestaurants = async ({
  restaurantName,
}: GetRestaurantsProps) => {
  return prisma.restaurant.findMany({
    where: restaurantName
      ? {
          name: {
            contains: restaurantName,
            mode: "insensitive",
          },
        }
      : undefined,
  });
};
