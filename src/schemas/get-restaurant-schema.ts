import { z } from "zod";

export const getRestaurantSchema = z.object({
  id: z.string().uuid(),
});

export type GetRestaurantSchema = z.infer<typeof getRestaurantSchema>;
