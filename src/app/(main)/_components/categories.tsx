import { getCategories } from "@/actions/get-categories";
import Image from "next/image";

export const Categories = async () => {
  const categories = await getCategories();

  return (
    <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex min-w-[120px] items-center justify-center gap-3 bg-white"
        >
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={36}
            height={36}
            className="rounded-full"
          />
          <p className="text-sm font-semibold text-[#323232]">
            {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};
