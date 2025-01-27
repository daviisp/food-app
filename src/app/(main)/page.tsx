import { Input } from "@/components/ui/input";
import { Header } from "../_components/header";
import { Banner } from "./_components/banner";
import { Categories } from "./_components/categories";
import { RecommendedProducts } from "./_components/recommended-products";
import { RecommendedRestaurants } from "./_components/recommended-restaurants";
import { SearchRestaurant } from "./_components/search-restaurant";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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

      <section className="hidden px-32 pt-8 md:block">
        <Categories />
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
