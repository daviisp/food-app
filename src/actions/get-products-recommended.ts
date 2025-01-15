"use server";

import { prisma } from "@/lib/prisma";

export const getProductsRecommended = async () => {
  return prisma.product.findMany({
    take: 10,
    include: {
      restaurant: true,
    },
  });
};
