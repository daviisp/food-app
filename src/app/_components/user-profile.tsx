import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { quickOption } from "@/constants/quick-options";
import { auth } from "@/lib/auth";
import { Heart, Home, ListOrdered, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonMakeLogin } from "./button-make-login";

export const UserProfile = async () => {
  const session = await auth();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="w-10/12 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left font-semibold text-[#323232]">
            Menu
          </SheetTitle>
        </SheetHeader>
        {session?.user ? (
          <section className="flex items-center gap-3 pt-6">
            <Avatar>
              <AvatarImage src={session.user.image!} alt={session.user.name!} />
              <AvatarFallback>{session.user.name?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-[#323232]">
                {session.user.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </section>
        ) : (
          <section className="flex items-center justify-between pt-6">
            <p className="font-semibold text-[#323232]">Olá. Faça seu login!</p>
            <ButtonMakeLogin />
          </section>
        )}

        <div className="py-6">
          <Separator />
        </div>

        <nav>
          <div className="space-y-1 text-sm font-semibold">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-full bg-button px-4 py-3 text-white"
            >
              <Home size={16} />
              Início
            </Link>
            <Link
              href="/my-orders"
              className="flex items-center gap-3 rounded-full px-4 py-3"
            >
              <ListOrdered size={16} />
              Meus Pedidos
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 rounded-full px-4 py-3"
            >
              <Heart size={16} />
              Restaurantes Favoritos
            </Link>
          </div>
          <div className="py-6">
            <Separator />
          </div>
          <div className="space-y-1">
            {quickOption.map((option) => (
              <Link
                href={option.href}
                key={option.title}
                className="flex items-center gap-3 px-4 py-3 text-sm"
              >
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
