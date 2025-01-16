"use server";

import { prisma } from "@/lib/prisma";
import {
  getRestaurantSchema,
  GetRestaurantSchema,
} from "@/schemas/get-restaurant-schema";

export const getRestaurant = async (data: GetRestaurantSchema) => {
  getRestaurantSchema.parse(data);

  return await prisma.restaurant.findUnique({
    where: {
      id: data.id,
    },
    include: {
      categories: true,
    },
  });
};
