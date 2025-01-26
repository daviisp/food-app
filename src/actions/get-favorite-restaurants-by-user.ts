"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getFavoriteRestaurantsByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  return await prisma.userFavoritesRestaurants.findMany({
    where: {
      userId: session.user.id as string,
    },
    include: {
      restaurant: true,
    },
  });
};
