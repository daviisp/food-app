import { Header } from "../_components/header";
import { Banner } from "./_components/banner";
import { Categories } from "./_components/categories";
import { RecommendedProducts } from "./_components/recommended-products";
import { RecommendedRestaurants } from "./_components/recommended-restaurants";
import { SearchRestaurant } from "./_components/search-restaurant";

const Home = () => {
  return (
    <>
      <Header />
      <section className="px-5 pt-6">
        <SearchRestaurant />
      </section>
      <section className="px-5 pt-6">
        <Categories />
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
      <section className="px-5 pt-6">
        <RecommendedRestaurants />
      </section>
    </>
  );
};

export default Home;
