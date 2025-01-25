"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createFavoriteRestaurant = async (restaurantId: string) => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  await prisma.userFavoritesRestaurants.create({
    data: {
      restaurantId,
      userId: session.user.id as string,
    },
  });

  revalidatePath("/");
};
