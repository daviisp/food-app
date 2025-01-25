"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getFavoritesRestaurantsByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  return prisma.userFavoritesRestaurants.findMany({
    where: {
      userId: session.user.id as string,
    },
  });
};
