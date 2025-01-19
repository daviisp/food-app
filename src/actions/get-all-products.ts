"use server";

import { prisma } from "@/lib/prisma";

export const getAllProducts = async () => {
  return prisma.product.findMany({
    include: {
      restaurant: true,
    },
  });
};
