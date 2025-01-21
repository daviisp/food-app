import { getProduct } from "@/actions/get-product";
import { CategoryWithProducts } from "@/app/_components/category-with-products";
import { RestaurantDeliveryInfo } from "@/app/_components/restaurant-delivery-info";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { ProductBanner } from "./_components/product-banner";
import { ProductInfo } from "./_components/product-info";

interface ProductPageParams {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: ProductPageParams) => {
  const id = (await params).id;
  const product = await getProduct({ id });

  if (!product) {
    return notFound();
  }

  return (
    <section>
      <div className="relative h-[370px] w-full">
        <ProductBanner product={product} />
      </div>
      <div className="absolute z-50 mt-[-15px] w-full rounded-tl-3xl rounded-tr-3xl bg-white p-5">
        <div>
          <ProductInfo product={product} />
        </div>
        <div className="pt-6">
          <RestaurantDeliveryInfo restaurant={product.restaurant} />
        </div>
        <div className="space-y-3 pt-6">
          <h2 className="font-semibold text-[#323232]">Sobre</h2>
          <p className="text-justify text-muted-foreground">
            {product.description}
          </p>
        </div>
        <div className="pt-6">
          <CategoryWithProducts restaurant={product.restaurant} />
        </div>
        <div className="w-full pb-5 pt-6">
          <Button className="w-full rounded-lg bg-button px-4 py-3 text-sm font-semibold hover:bg-button/70">
            Adicionar à sacola
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
