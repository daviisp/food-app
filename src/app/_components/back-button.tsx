"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      className="h-8 w-8 rounded-full bg-white p-2.5 text-black hover:bg-white"
      onClick={() => router.back()}
    >
      <ChevronLeft size={24} />
    </Button>
  );
};
