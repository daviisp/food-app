"use client";

import { Heart, ListOrdered } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export const MyOrdersAndMyRestaurants = () => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const verifyIfUserExists = (e: React.MouseEvent) => {
    if (!session?.user) {
      e.preventDefault();
      return toast({
        title: "Erro",
        description: "Faça seu login primeiro!",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Link
        href="/my-orders"
        className="flex items-center gap-3 rounded-full px-4 py-3"
        onClick={verifyIfUserExists}
      >
        <ListOrdered size={16} />
        Meus Pedidos
      </Link>
      <Link
        href="/my-favorite-restaurants"
        className="flex items-center gap-3 rounded-full px-4 py-3"
        onClick={verifyIfUserExists}
      >
        <Heart size={16} />
        Restaurantes Favoritos
      </Link>
    </>
  );
};
