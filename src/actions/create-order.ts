"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  createOrderSchema,
  CreateOrderSchema,
} from "@/schemas/create-order-schema";

export const createOrder = async (data: CreateOrderSchema) => {
  createOrderSchema.parse(data);

  const session = await auth();

  if (!session?.user) {
    return;
  }

  for (const product of data.products) {
    const findProductInDb = await prisma.product.findUnique({
      where: {
        id: product.id,
      },
      include: {
        restaurant: true,
      },
    });

    if (!findProductInDb) {
      return;
    }

    await prisma.order.create({
      data: {
        productId: product.id,
        restaurantId: data.restaurantId,
        quantity: product.quantity,
        price:
          ((Number(findProductInDb.originalPrice) *
            findProductInDb.discountPercentage) /
            100) *
            product.quantity +
          Number(findProductInDb.restaurant.deliveryFee),
        userId: session.user.id as string,
      },
    });
  }
};
