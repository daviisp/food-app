"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleFavoriteRestaurant = async (restaurantId: string) => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  const existingFavorite = await prisma.userFavoritesRestaurants.findFirst({
    where: {
      restaurantId,
      userId: session.user.id as string,
    },
  });

  if (existingFavorite) {
    await prisma.userFavoritesRestaurants.delete({
      where: {
        id: existingFavorite.id,
      },
    });
  } else {
    await prisma.userFavoritesRestaurants.create({
      data: {
        restaurantId,
        userId: session.user.id as string,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/my-favorite-restaurants");
};
