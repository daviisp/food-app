import { getProduct } from "@/actions/get-product";
import { notFound } from "next/navigation";
import { ProductDetails } from "./_components/product-details";
import { Header } from "@/app/_components/header";
import { Separator } from "@/components/ui/separator";

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
    <>
      <Header />
      <div className="mb-10 mt-5">
        <Separator />
      </div>
      <section>
        <ProductDetails
          product={{ ...product, originalPrice: Number(product.originalPrice) }}
        />
      </section>
    </>
  );
};

export default ProductPage;
