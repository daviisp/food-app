import { getCategories } from "@/actions/get-categories";
import Image from "next/image";
import Link from "next/link";

export const Categories = async () => {
  const categories = await getCategories();

  return (
    <div className="md:gap-18 flex gap-3 overflow-x-auto md:justify-center [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <Link
          key={category.id}
          className="flex min-w-[120px] items-center justify-center gap-3 md:min-w-[152px] md:px-4 md:py-3"
          href={`/category?categoryName=${category.name}`}
        >
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
            unoptimized
          />
          <p className="text-sm font-semibold text-[#323232]">
            {category.name}
          </p>
        </Link>
      ))}
    </div>
  );
};
