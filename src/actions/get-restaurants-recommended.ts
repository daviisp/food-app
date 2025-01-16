"use server";

import { prisma } from "@/lib/prisma";

export const getRestaurantsRecommeded = async () => {
  return prisma.restaurant.findMany({});
};
