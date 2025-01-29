import { getOrdersByUser } from "@/actions/get-orders-by-user";
import { Header } from "../_components/header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/helpers/price";
import { isBefore, startOfToday } from "date-fns";

const MyOrdersPage = async () => {
  const orders = await getOrdersByUser();

  if (!orders) {
    return;
  }

  const today = startOfToday();

  const sortedOrders = orders.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    const aCompleted = isBefore(aDate, today);
    const bCompleted = isBefore(bDate, today);

    if (aCompleted === bCompleted) return 0;
    return aCompleted ? 1 : -1;
  });

  return (
    <>
      <Header />
      <div className="hidden pb-10 pt-5 md:block">
        <Separator />
      </div>
      <div>
        <h2 className="px-5 py-6 text-lg font-semibold md:px-32 md:pb-6 md:pt-0 md:text-xl">
          Meus Pedidos
        </h2>
        <div className="space-y-2 md:space-y-6">
          {sortedOrders.map((order) => {
            const orderDate = new Date(order.createdAt);
            const isOrderCompleted = isBefore(orderDate, today);

            return (
              <Card key={order.id} className="mx-5 md:mx-32">
                <CardContent className="p-5">
                  <div>
                    <div
                      className={`w-fit rounded-xl px-2 py-0.5 text-xs font-semibold text-white ${
                        isOrderCompleted ? "bg-gray-500" : "bg-[#5DC05B]"
                      }`}
                    >
                      <span>
                        {isOrderCompleted ? "Finalizado" : "Em transporte"}
                      </span>
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
                      <Button
                        asChild
                        className="hover:bg-white"
                        variant="ghost"
                      >
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
                      {order.quantity}
                    </span>
                    <p className="text-sm text-[#7E8392]">
                      {order.product.name}
                    </p>
                  </div>
                  <Separator />
                  <div className="pt-3">
                    <p className="text-xs">{formatPrice(order.price)}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
