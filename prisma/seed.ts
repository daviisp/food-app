const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Criando 10 restaurantes
  const restaurants = await prisma.restaurant.createMany({
    data: [
      {
        name: "Pizza Palace",
        imageUrl: "https://picsum.photos/seed/restaurant1/600/400",
        deliveryFee: 5.0,
        deliveryTime: 30,
      },
      {
        name: "Steak House",
        imageUrl: "https://picsum.photos/seed/restaurant2/600/400",
        deliveryFee: 7.5,
        deliveryTime: 45,
      },
      {
        name: "Sushi Corner",
        imageUrl: "https://picsum.photos/seed/restaurant3/600/400",
        deliveryFee: 4.0,
        deliveryTime: 25,
      },
      {
        name: "Burger Joint",
        imageUrl: "https://picsum.photos/seed/restaurant4/600/400",
        deliveryFee: 3.5,
        deliveryTime: 20,
      },
      {
        name: "Pasta Place",
        imageUrl: "https://picsum.photos/seed/restaurant5/600/400",
        deliveryFee: 6.0,
        deliveryTime: 35,
      },
      {
        name: "Green Bowl",
        imageUrl: "https://picsum.photos/seed/restaurant6/600/400",
        deliveryFee: 4.5,
        deliveryTime: 25,
      },
      {
        name: "Sweet Treats",
        imageUrl: "https://picsum.photos/seed/restaurant7/600/400",
        deliveryFee: 3.0,
        deliveryTime: 15,
      },
      {
        name: "Fusion Delight",
        imageUrl: "https://picsum.photos/seed/restaurant8/600/400",
        deliveryFee: 5.5,
        deliveryTime: 40,
      },
      {
        name: "Barbecue Pit",
        imageUrl: "https://picsum.photos/seed/restaurant9/600/400",
        deliveryFee: 6.5,
        deliveryTime: 50,
      },
      {
        name: "Seafood Haven",
        imageUrl: "https://picsum.photos/seed/restaurant10/600/400",
        deliveryFee: 8.0,
        deliveryTime: 60,
      },
    ],
  });

  const restaurantRecords = await prisma.restaurant.findMany();

  // Crie categorias para cada restaurante
  const categories = await prisma.category.createMany({
    data: restaurantRecords.flatMap((restaurant: { id: string }) => [
      {
        name: "Pratos",
        imageUrl: "https://picsum.photos/seed/category1/600/400",
        restaurantId: restaurant.id,
      },
      {
        name: "Lanches",
        imageUrl: "https://picsum.photos/seed/category2/600/400",
        restaurantId: restaurant.id,
      },
      {
        name: "Pizza",
        imageUrl: "https://picsum.photos/seed/category3/600/400",
        restaurantId: restaurant.id,
      },
      {
        name: "Sobremesas",
        imageUrl: "https://picsum.photos/seed/category4/600/400",
        restaurantId: restaurant.id,
      },
      {
        name: "Sucos",
        imageUrl: "https://picsum.photos/seed/category5/600/400",
        restaurantId: restaurant.id,
      },
      {
        name: "Bebidas",
        imageUrl: "https://picsum.photos/seed/category6/600/400",
        restaurantId: restaurant.id,
      },
    ]),
  });

  const categoryRecords = await prisma.category.findMany();

  // Criando produtos vinculados às categorias
  const products = await prisma.product.createMany({
    data: categoryRecords.flatMap(
      (category: { id: string; restaurantId: string }) => [
        {
          name: "Pizza Margherita",
          imageUrl:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
          description:
            "Pizza clássica com molho de tomate, mussarela e manjericão.",
          originalPrice: 40.0,
          discountPercentage: 12,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Pizza Pepperoni",
          imageUrl:
            "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
          description:
            "Pizza com molho de tomate, mussarela e fatias de pepperoni.",
          originalPrice: 50.0,
          discountPercentage: 10,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Sashimi",
          imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754",
          description: "Fatias de peixe cru fresco, perfeitas para degustar.",
          originalPrice: 80.0,
          discountPercentage: 25,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Cheeseburger",
          imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349",
          description: "Hambúrguer com queijo derretido e temperos especiais.",
          originalPrice: 27.0,
          discountPercentage: 10,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Salada César",
          imageUrl:
            "https://images.unsplash.com/photo-1589927986089-358123ce6d4d",
          description:
            "Clássica salada César com alface fresca, croutons e parmesão.",
          originalPrice: 25.0,
          discountPercentage: 15,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Bolo de Chocolate",
          imageUrl:
            "https://images.unsplash.com/photo-1586985287164-f55f6b637065",
          description:
            "Delicioso bolo de chocolate com cobertura cremosa e recheio.",
          originalPrice: 18.0,
          discountPercentage: 5,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Taco de Carne",
          imageUrl:
            "https://images.unsplash.com/photo-1579586335121-ca5f007ae86b",
          description:
            "Taco mexicano recheado com carne temperada e vegetais frescos.",
          originalPrice: 15.0,
          discountPercentage: 20,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Frango Grelhado",
          imageUrl:
            "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
          description:
            "Filé de frango grelhado com especiarias, servido com vegetais.",
          originalPrice: 30.0,
          discountPercentage: 10,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
      ],
    ),
  });

  console.log({ restaurants, categories, products });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
