interface QuickOption {
  imageUrl: string;
  title: string;
  href: string;
}

export const quickOption: QuickOption[] = [
  {
    imageUrl: "/dishes.svg",
    title: "Pratos",
    href: "/category?categoryName=pratos",
  },
  {
    imageUrl: "/snacks.svg",
    title: "Lanches",
    href: "/category?categoryName=lanches",
  },
  {
    imageUrl: "/pizza.svg",
    title: "Pizza",
    href: "/category?categoryName=pizza",
  },
  {
    imageUrl: "/desserts.svg",
    title: "Sobremesas",
    href: "/category?categoryName=sobremesas",
  },
  {
    imageUrl: "/juices.svg",
    title: "Sucos",
    href: "/category?categoryName=sucos",
  },
  {
    imageUrl: "/soda.svg",
    title: "Bebidas",
    href: "/category?categoryName=bebidas",
  },
];
