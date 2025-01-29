"use client";

import { toggleFavoriteRestaurant } from "@/actions/toggleFavoriteRestaurant";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

interface ToggleRestaurantFavoriteProps {
  restaurantId: string;
}

export const FavoriteRestaurant = ({
  restaurantId,
}: ToggleRestaurantFavoriteProps) => {
  const handleToggleFavoriteRestaurant = async () => {
    try {
      await toggleFavoriteRestaurant(restaurantId);
      toast({
        title: "Sucesso",
        description: "Restaurante removido dos favoritos com sucesso!",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro",
        description: "Algum erro aconteceu. Tente novamente",
      });
    }
  };

  return (
    <div className="absolute right-2 top-2 h-7 w-7 rounded-full bg-white text-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex h-full items-center justify-center">
            <Heart size={16} fill="#EA1B2C" className="text-[#EA1B2C]" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[350px] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Remover Restaurante
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-center">
            Tem certeza que deseja remover esse restaurante dos favoritos?
          </AlertDialogDescription>
          <div className="text-center">
            <AlertDialogCancel className="rounded-lg bg-[#F4F4F5] font-semibold">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleToggleFavoriteRestaurant}
              className="ml-3 rounded-lg bg-button font-semibold"
            >
              Confirmar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
