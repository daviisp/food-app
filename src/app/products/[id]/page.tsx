import { getProduct } from "@/actions/get-product";
import { notFound } from "next/navigation";
import { ProductDetails } from "./_components/product-details";

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
      <ProductDetails
        product={{ ...product, originalPrice: Number(product.originalPrice) }}
      />
    </section>
  );
};

export default ProductPage;
