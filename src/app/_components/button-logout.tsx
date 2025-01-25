"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const ButtonLogout = () => {
  return (
    <Button
      variant="ghost"
      className="gap-3 p-0 text-sm text-[#323232] hover:bg-white"
      onClick={() => signOut()}
    >
      <LogOut />
      Sair da conta
    </Button>
  );
};
