import { getRestaurant } from "@/actions/get-restaurant";
import { notFound } from "next/navigation";
import { RestaurantBanner } from "./_components/restaurant-banner";
import { RestaurantInfo } from "./_components/restaurant-info";
import { BestProductsOfRestaurant } from "./_components/best-products.of-restaurant";
import { CategoryWithProducts } from "../../_components/category-with-products";
import { Header } from "@/app/_components/header";
import Image from "next/image";
import { ShowTotalProductsInCart } from "./_components/show-total-producs-in-cart";

interface RestaurantPageParams {
  params: Promise<{ id: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageParams) => {
  const id = (await params).id;
  const restaurant = await getRestaurant({ id });

  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <div className="overflow-x-hidden md:hidden">
        <section className="relative min-h-52 w-full">
          <RestaurantBanner restaurant={restaurant} />
        </section>
        <section className="relative z-50 mt-[-1rem] w-full rounded-tl-3xl rounded-tr-3xl bg-white px-5">
          <RestaurantInfo restaurant={restaurant} />
          <section className="overflow-x-auto pt-8 [&::-webkit-scrollbar]:hidden">
            <BestProductsOfRestaurant restaurant={restaurant} />
          </section>
          <section className="flex gap-4 overflow-x-auto pt-8 [&::-webkit-scrollbar]:hidden">
            <CategoryWithProducts restaurant={restaurant} />
          </section>
        </section>
      </div>
      <div className="hidden md:block">
        <Header />
        <div className="mt-10 grid grid-cols-[2fr,1fr] gap-8 px-32">
          <div className="relative h-[380px] w-full">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-lg object-cover"
              unoptimized
            />
          </div>
          <div>
            <div>
              <RestaurantInfo restaurant={restaurant} />
            </div>
            <div>
              <h2 className="pb-3 pt-6 font-semibold text-[#323232]">Sobre</h2>
              <p className="text-justify text-sm text-[#7E8392]">
                Descubra um ambiente acolhedor, perfeito para reunir amigos e
                família enquanto saboreia pratos incríveis que celebram o melhor
                da gastronomia. Este restaurante combina ingredientes frescos e
                cuidadosamente selecionados com receitas que trazem uma explosão
                de sabores a cada mordida.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-6 px-32">
          <div>
            <BestProductsOfRestaurant restaurant={restaurant} />
          </div>
          <div>
            <CategoryWithProducts restaurant={restaurant} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-white">
        <ShowTotalProductsInCart />
      </div>
    </>
  );
};

export default RestaurantPage;
