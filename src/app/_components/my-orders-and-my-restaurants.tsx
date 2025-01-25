"use client";

import { Heart, ListOrdered } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

export const MyOrdersAndMyRestaurants = () => {
  const { data: session } = useSession();

  const verifyIfUserExists = (e: React.MouseEvent) => {
    if (!session?.user) {
      e.preventDefault();
      return toast.error("Faça Login primeiro!");
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
        href="/"
        className="flex items-center gap-3 rounded-full px-4 py-3"
        onClick={verifyIfUserExists}
      >
        <Heart size={16} />
        Restaurantes Favoritos
      </Link>
    </>
  );
};
