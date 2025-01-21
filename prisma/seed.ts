const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Criando 10 restaurantes
  const restaurants = await prisma.restaurant.createMany({
    data: [
      {
        name: "Pizza Palace",
        imageUrl: "https://via.placeholder.com/400x300?text=Pizza+Palace",
        deliveryFee: 5.0,
        deliveryTime: 30,
      },
      {
        name: "Churrasco Grill",
        imageUrl: "https://via.placeholder.com/400x300?text=Churrasco+Grill",
        deliveryFee: 8.0,
        deliveryTime: 45,
      },
      {
        name: "Sushi World",
        imageUrl: "https://via.placeholder.com/400x300?text=Sushi+World",
        deliveryFee: 10.0,
        deliveryTime: 40,
      },
      {
        name: "Burger Haven",
        imageUrl: "https://via.placeholder.com/400x300?text=Burger+Haven",
        deliveryFee: 6.0,
        deliveryTime: 25,
      },
      {
        name: "Veggie Delight",
        imageUrl: "https://via.placeholder.com/400x300?text=Veggie+Delight",
        deliveryFee: 4.0,
        deliveryTime: 20,
      },
      {
        name: "Pasta Paradise",
        imageUrl: "https://via.placeholder.com/400x300?text=Pasta+Paradise",
        deliveryFee: 7.0,
        deliveryTime: 35,
      },
      {
        name: "Dessert Dream",
        imageUrl: "https://via.placeholder.com/400x300?text=Dessert+Dream",
        deliveryFee: 3.0,
        deliveryTime: 15,
      },
      {
        name: "Seafood Shack",
        imageUrl: "https://via.placeholder.com/400x300?text=Seafood+Shack",
        deliveryFee: 9.0,
        deliveryTime: 50,
      },
      {
        name: "Taco Fiesta",
        imageUrl: "https://via.placeholder.com/400x300?text=Taco+Fiesta",
        deliveryFee: 5.5,
        deliveryTime: 30,
      },
      {
        name: "BBQ Barn",
        imageUrl: "https://via.placeholder.com/400x300?text=BBQ+Barn",
        deliveryFee: 8.5,
        deliveryTime: 40,
      },
    ],
  });

  const restaurantRecords = await prisma.restaurant.findMany();

  // Crie categorias para cada restaurante
  const categories = await prisma.category.createMany({
    data: restaurantRecords.flatMap((restaurant: { id: string }) => [
      {
        name: "Pizzas",
        imageUrl: "https://via.placeholder.com/400x300?text=Pizzas",
        restaurantId: restaurant.id,
      },
      {
        name: "Churrasco",
        imageUrl: "https://via.placeholder.com/400x300?text=Churrasco",
        restaurantId: restaurant.id,
      },
      {
        name: "Sushi",
        imageUrl: "https://via.placeholder.com/400x300?text=Sushi",
        restaurantId: restaurant.id,
      },
      // Adicione mais categorias aqui, se necessário
    ]),
  });

  const categoryRecords = await prisma.category.findMany();

  // Criando produtos vinculados às categorias
  const products = await prisma.product.createMany({
    data: categoryRecords.flatMap(
      (category: { id: string; restaurantId: string }) => [
        {
          name: "Pizza Margherita",
          imageUrl: "https://via.placeholder.com/400x300?text=Pizza+Margherita",
          description:
            "Pizza clássica com molho de tomate, mussarela e manjericão.",
          originalPrice: 40.0,
          discountPercentage: 12,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Pizza Pepperoni",
          imageUrl: "https://via.placeholder.com/400x300?text=Pizza+Pepperoni",
          description:
            "Pizza com molho de tomate, mussarela e fatias de pepperoni.",
          originalPrice: 50.0,
          discountPercentage: 10,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Pizza Quatro Queijos",
          imageUrl:
            "https://via.placeholder.com/400x300?text=Pizza+Quatro+Queijos",
          description: "Pizza com uma combinação deliciosa de quatro queijos.",
          originalPrice: 55.0,
          discountPercentage: 15,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Pizza Calabresa",
          imageUrl: "https://via.placeholder.com/400x300?text=Pizza+Calabresa",
          description: "Pizza com molho de tomate, mussarela e calabresa.",
          originalPrice: 45.0,
          discountPercentage: 10,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Pizza Portuguesa",
          imageUrl: "https://via.placeholder.com/400x300?text=Pizza+Portuguesa",
          description: "Pizza com presunto, cebola, ovos e azeitonas.",
          originalPrice: 48.0,
          discountPercentage: 8,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Pizza Frango com Catupiry",
          imageUrl:
            "https://via.placeholder.com/400x300?text=Pizza+Frango+com+Catupiry",
          description: "Pizza com frango desfiado e catupiry cremoso.",
          originalPrice: 50.0,
          discountPercentage: 10,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Pizza Vegetariana",
          imageUrl:
            "https://via.placeholder.com/400x300?text=Pizza+Vegetariana",
          description: "Pizza com uma seleção de vegetais frescos.",
          originalPrice: 42.0,
          discountPercentage: 12,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Pizza de Chocolate",
          imageUrl:
            "https://via.placeholder.com/400x300?text=Pizza+de+Chocolate",
          description: "Pizza doce com chocolate e cobertura especial.",
          originalPrice: 60.0,
          discountPercentage: 20,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Espetinho de Carne",
          imageUrl:
            "https://via.placeholder.com/400x300?text=Espetinho+de+Carne",
          description: "Carne suculenta no espeto com temperos especiais.",
          originalPrice: 18.0,
          discountPercentage: 10,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Espetinho de Frango",
          imageUrl:
            "https://via.placeholder.com/400x300?text=Espetinho+de+Frango",
          description: "Frango bem temperado e grelhado no espeto.",
          originalPrice: 15.0,
          discountPercentage: 5,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Espetinho Misto",
          imageUrl: "https://via.placeholder.com/400x300?text=Espetinho+Misto",
          description: "Mistura de carne e frango grelhados no espeto.",
          originalPrice: 20.0,
          discountPercentage: 7,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Espetinho de Linguiça",
          imageUrl:
            "https://via.placeholder.com/400x300?text=Espetinho+de+Linguiça",
          description: "Linguiça grelhada e temperada no espeto.",
          originalPrice: 17.0,
          discountPercentage: 5,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Espetinho de Vegetais",
          imageUrl:
            "https://via.placeholder.com/400x300?text=Espetinho+de+Vegetais",
          description: "Legumes grelhados e bem temperados no espeto.",
          originalPrice: 14.0,
          discountPercentage: 8,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Hambúrguer Clássico",
          imageUrl:
            "https://via.placeholder.com/400x300?text=Hambúrguer+Clássico",
          description: "Hambúrguer com carne bovina, queijo, alface e tomate.",
          originalPrice: 25.0,
          discountPercentage: 15,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Cheeseburger",
          imageUrl: "https://via.placeholder.com/400x300?text=Cheeseburger",
          description: "Hambúrguer com queijo derretido e temperos especiais.",
          originalPrice: 27.0,
          discountPercentage: 10,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Sushi Combo",
          imageUrl: "https://via.placeholder.com/400x300?text=Sushi+Combo",
          description: "Combinado de sushi com 12 peças variadas.",
          originalPrice: 60.0,
          discountPercentage: 20,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        {
          name: "Sashimi",
          imageUrl: "https://via.placeholder.com/400x300?text=Sashimi",
          description: "Fatias de peixe cru fresco, perfeitas para degustar.",
          originalPrice: 80.0,
          discountPercentage: 25,
          categoryId: category.id,
          restaurantId: category.restaurantId,
        },
        // Continue adicionando produtos para cada categoria conforme necessário
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
