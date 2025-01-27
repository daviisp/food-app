import { Input } from "@/components/ui/input";
import { Header } from "../_components/header";
import { Banner } from "./_components/banner";
import { Categories } from "./_components/categories";
import { RecommendedProducts } from "./_components/recommended-products";
import { RecommendedRestaurants } from "./_components/recommended-restaurants";
import { SearchRestaurant } from "./_components/search-restaurant";
import { SearchRestaurantDesktop } from "./_components/search-restaurant-desktop";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <Header />
      <section className="px-5 pt-6 md:hidden">
        <SearchRestaurant />
      </section>
      <section className="px-5 pt-6 md:hidden">
        <Categories />
      </section>
      <section className="px-5 pt-6 md:hidden">
        <Banner src="/banner-discount.svg" />
      </section>
      {/* Componente desktop */}
      <section className="mt-5 hidden h-[500px] items-center justify-between bg-button px-32 md:flex">
        <div className="w-[630px]">
          <h2 className="mb-3 text-5xl font-bold text-white">Está com fome?</h2>
          <p className="text-lg text-white">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>
          <div className="mt-8 rounded-lg bg-white p-6">
            <SearchRestaurantDesktop />
          </div>
        </div>
        <div className="hidden xl:block">
          <Image
            src="/banner-desktop.png"
            alt="Banner"
            width={371}
            height={371}
            unoptimized
          />
        </div>
      </section>

      {/* Componente desktop */}
      <section className="hidden px-32 pt-8 md:block">
        <Categories />
      </section>

      {/* Componente desktop e mobile */}
      <section className="px-5 pt-6 md:px-32 md:pt-10">
        <RecommendedProducts />
      </section>

      <section className="px-5 pt-6 md:hidden">
        <Banner src="/banner-hamburguer.svg" />
      </section>

      {/* Componente desktop */}
      <section className="hidden justify-center gap-5 px-32 pt-10 md:flex">
        <div className="relative h-[215px] w-full">
          <Image
            src="/banner-discount.svg"
            alt="Até 30% de desconto em pizzas"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <div className="relative h-[215px] w-full">
          <Image
            src="/banner-hamburguer.svg"
            alt="Até 30% de desconto em pizzas"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </section>
      <section className="px-5 pt-6 md:px-32 md:pt-10">
        <RecommendedRestaurants />
      </section>
    </>
  );
};

export default Home;
