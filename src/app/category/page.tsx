import { getCategory } from "@/actions/get-category";
import { Header } from "../_components/header";
import { notFound } from "next/navigation";
import { ProductItem } from "../_components/product-item";
import { Separator } from "@/components/ui/separator";

interface CategoryPageParams {
  searchParams: Promise<{ categoryName: string }>;
}

const CategoryPage = async ({ searchParams }: CategoryPageParams) => {
  const categoryName = (await searchParams).categoryName;
  const category = await getCategory(categoryName);

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="hidden pb-10 pt-5 md:block">
        <Separator />
      </div>
      <section className="px-5 pt-6 md:px-32 md:pb-6 md:pt-0">
        <h2 className="pb-6 text-lg font-semibold">{category.name}</h2>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {category.products.map((product) => (
            <ProductItem
              product={{
                ...product,
                originalPrice: Number(product.originalPrice),
              }}
              key={product.id}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
