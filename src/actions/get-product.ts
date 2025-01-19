"use server";

import { prisma } from "@/lib/prisma";
import {
  getProductSchema,
  GetProductSchema,
} from "@/schemas/get-product-schema";

export const getProduct = async (data: GetProductSchema) => {
  getProductSchema.parse(data);

  return prisma.product.findUnique({
    where: {
      id: data.id,
    },
    include: {
      restaurant: {
        include: {
          categories: {
            include: {
              products: {
                include: {
                  restaurant: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
