"use server";

import { prisma } from "@/lib/prisma";

export const getCategories = async () => {
  const categories = await prisma.$queryRaw<
    { id: string; name: string; imageUrl: string }[]
  >`
    SELECT DISTINCT ON (name) *
    FROM "categories"
    LIMIT 7;
  `;

  return categories;
};
