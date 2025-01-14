const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const restaurantNames = [
    "Pizzaria Italiana",
    "Hamburgueria Gourmet",
    "Sushi do Chef",
    "Churrascaria Gaúcha",
    "Pastelaria Sabor Brasil",
    "Cafeteria Delícia",
    "Sorveteria Gelato",
    "Cantina da Vovó",
    "Restaurante Vegano Natural",
    "Food Truck Mexicano",
  ];

  // Criação de restaurantes
  const restaurants = await Promise.all(
    restaurantNames.map((name) =>
      prisma.restaurant.create({
        data: {
          name,
          imageUrl: "https://via.placeholder.com/150",
          deliveryFee: "5",
          deliveryTime: Math.floor(Math.random() * 30) + 10,
        },
      })
    )
  );

  const categoriesData = [
    { name: "Sucos", imageUrl: "https://via.placeholder.com/150" },
    { name: "Pratos", imageUrl: "https://via.placeholder.com/150" },
    { name: "Lanches", imageUrl: "https://via.placeholder.com/150" },
    { name: "Pizzas", imageUrl: "https://via.placeholder.com/150" },
    { name: "Sobremesas", imageUrl: "https://via.placeholder.com/150" },
    { name: "Bebidas", imageUrl: "https://via.placeholder.com/150" },
  ];

  const categories = await Promise.all(
    categoriesData.map((category, index) =>
      prisma.category.create({
        data: {
          name: category.name,
          imageUrl: category.imageUrl,
          restaurantId: restaurants[index % restaurants.length].id,
        },
      })
    )
  );

  const productNames = [
    "Suco de Laranja",
    "Suco Detox",
    "Hambúrguer Artesanal",
    "Pizza Margherita",
    "Pizza Calabresa",
    "Coxinha de Frango",
    "Brownie com Sorvete",
    "Pudim de Leite",
    "Refrigerante Lata",
    "Água Mineral",
    "Sashimi de Salmão",
    "Temaki de Atum",
    "Espeto de Picanha",
    "Feijoada Completa",
    "Tábua de Frios",
    "Pastel de Queijo",
    "Torta de Limão",
    "Café Expresso",
    "Capuccino",
    "Sorvete de Chocolate",
    "Milkshake de Morango",
    "Guacamole com Nachos",
    "Tacos de Carne",
    "Burrito Vegetariano",
    "Crepe de Nutella",
  ];

  const products = await Promise.all(
    productNames.map((name) =>
      prisma.product.create({
        data: {
          name,
          imageUrl: "https://via.placeholder.com/150",
          description: `Delicioso ${name.toLowerCase()} feito com ingredientes frescos.`,
          originalPrice: parseFloat((Math.random() * 20 + 5).toFixed(2)),
          discountPercentage: Math.floor(Math.random() * 30),
          restaurantId:
            restaurants[Math.floor(Math.random() * restaurants.length)].id,
          categoryId:
            categories[Math.floor(Math.random() * categories.length)].id,
        },
      })
    )
  );

  console.log("Dados criados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
