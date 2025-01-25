import { z } from "zod";

export const createOrderSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
  restaurantId: z.string().uuid(),
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
