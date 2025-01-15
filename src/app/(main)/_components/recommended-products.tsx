import { getProductsRecommended } from "@/actions/get-products-recommended";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ProductList } from "./product-list";

export const RecommendedProducts = async () => {
  const products = await getProductsRecommended();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#323232]">Pedidos Recomendados</h2>
        <Button
          variant="ghost"
          className="hover:text-[#EA1D2C]/ w-fit gap-0 p-0 text-xs text-[#EA1D2C] hover:bg-transparent"
        >
          Ver todos
          <ChevronRight size={16} />
        </Button>
      </div>
      <div>
        <ProductList products={products} />
      </div>
    </div>
  );
};
