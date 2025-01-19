import { getAllProducts } from "@/actions/get-all-products";
import { Header } from "../_components/header";
import { ProductItem } from "../_components/product-item";

const ProductsPage = async () => {
  const products = await getAllProducts();

  return (
    <>
      <Header />
      <section className="flex flex-col gap-4 px-5 pt-6">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </section>
    </>
  );
};

export default ProductsPage;
