import { getCategory } from "@/actions/get-category";
import { Header } from "../_components/header";
import { notFound } from "next/navigation";
import { ProductItem } from "../_components/product-item";

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
      <section className="flex flex-col gap-4 px-5 pt-6">
        <h2 className="text-lg font-semibold">{category.name}</h2>
        {category.products.map((product) => (
          <ProductItem
            product={{
              ...product,
              originalPrice: Number(product.originalPrice),
            }}
            key={product.id}
          />
        ))}
      </section>
    </>
  );
};

export default CategoryPage;
