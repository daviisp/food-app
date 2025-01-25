"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  restaurantName: z.string().trim().min(1, {
    message: "Digite o nome do restaurante para pesquisar",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export const SearchRestaurant = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
    },
  });

  const router = useRouter();

  const onSubmit = (data: FormSchema) => {
    router.push(`/restaurants?restaurantName=${data.restaurantName}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-1">
        <FormField
          control={form.control}
          name="restaurantName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Buscar restaurantes"
                  {...field}
                  className="#F4F4F5 text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="icon"
          className="bg-button hover:bg-button/80"
        >
          <Search />
        </Button>
      </form>
    </Form>
  );
};
