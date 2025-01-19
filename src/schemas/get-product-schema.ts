import { z } from "zod";

export const getProductSchema = z.object({
  id: z.string().uuid(),
});

export type GetProductSchema = z.infer<typeof getProductSchema>;
