"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  return prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      product: {
        include: {
          restaurant: true,
        },
      },
    },
  });
};
