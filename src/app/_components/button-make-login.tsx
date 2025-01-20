"use client";

import { authByGoogle } from "@/actions/make-login";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export const ButtonMakeLogin = () => {
  return (
    <Button
      className="bg-button hover:bg-button/70"
      size="icon"
      onClick={authByGoogle}
    >
      <LogIn size={18} />
    </Button>
  );
};
