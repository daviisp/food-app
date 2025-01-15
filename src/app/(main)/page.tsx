import { Banner } from "./_components/banner";
import { RecommendedProducts } from "./_components/recommended-products";
import { SearchRestaurant } from "./_components/search-restaurant";

const Home = () => {
  return (
    <>
      <section className="px-5 pt-6">
        <SearchRestaurant />
      </section>
      <section className="px-5 pt-6">
        <Banner src="/banner-discount.svg" />
      </section>
      <section className="px-5 pt-6">
        <RecommendedProducts />
      </section>
      <section className="px-5 pt-6">
        <Banner src="/banner-hamburguer.svg" />
      </section>
    </>
  );
};

export default Home;
