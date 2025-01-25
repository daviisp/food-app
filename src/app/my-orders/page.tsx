import { getOrdersByUser } from "@/actions/get-orders-by-user";
import { Header } from "../_components/header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/helpers/price";

const MyOders = async () => {
  const orders = await getOrdersByUser();

  if (!orders) {
    return;
  }

  return (
    <>
      <Header />
      <div>
        <h2 className="px-5 py-6 text-lg font-semibold">Meus Pedidos</h2>
        <div className="space-y-2">
          {orders.map((order) => (
            <Card key={order.id} className="mx-5">
              <CardContent className="p-5">
                <div>
                  <div className="w-fit rounded-xl bg-[#5DC05B] px-2 py-0.5 text-xs font-semibold text-white">
                    <span>Em transporte</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={order.product.imageUrl}
                      alt={order.product.name}
                      width={16}
                      height={16}
                      className="h-6 w-6 rounded-full object-cover"
                      unoptimized
                    />
                    <p className="text-sm font-semibold">
                      {order.product.restaurant.name}
                    </p>
                  </div>
                  <div>
                    <Button asChild className="hover:bg-white" variant="ghost">
                      <Link
                        href={`/restaurants/${order.product.restaurant.id}`}
                      >
                        <ChevronRight size={20} />
                      </Link>
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-1.5 py-3">
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#7E8392] text-sm text-white">
                    1
                  </span>
                  <p className="text-sm text-[#7E8392]">{order.product.name}</p>
                </div>
                <Separator />
                <div className="pt-3">
                  <p className="text-xs">{formatPrice(order.price)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOders;
