"use server";

import { prisma } from "@/lib/prisma";

export const getCategory = async (name: string) => {
  return prisma.category.findFirst({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    include: {
      products: {
        include: {
          restaurant: true,
        },
      },
    },
  });
};
