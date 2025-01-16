const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const restaurantNames = [
    "Pizza Palace",
    "Burger Bonanza",
    "Sushi World",
    "Taco Haven",
    "Pasta Paradise",
    "Smoothie Spot",
    "Barbecue Bistro",
    "Vegan Vibes",
    "Seafood Shack",
    "Dessert Delights",
  ];

  const categoryNames = [
    "Sucos",
    "Pratos",
    "Lanches",
    "Pizzas",
    "Sobremesas",
    "Bebidas",
    "Saladas",
    "Cafés",
    "Petiscos",
    "Frutos do Mar",
  ];

  const productNames = [
    "Pizza Margherita",
    "Cheeseburger",
    "California Roll",
    "Chicken Tacos",
    "Spaghetti Bolognese",
    "Mango Smoothie",
    "BBQ Ribs",
    "Vegan Burger",
    "Grilled Salmon",
    "Chocolate Cake",
  ];

  const restaurants = await Promise.all(
    restaurantNames.map((name) =>
      prisma.restaurant.create({
        data: {
          name,
          imageUrl: `https://picsum.photos/seed/${name.replace(/\s+/g, "-")}/150`,
          deliveryFee: 5,
          deliveryTime: Math.floor(Math.random() * 30) + 10,
        },
      }),
    ),
  );

  for (const restaurant of restaurants) {
    // Criar no mínimo 6 categorias para cada restaurante
    const restaurantCategories = categoryNames
      .slice(0, 6)
      .map((categoryName) => ({
        name: categoryName,
        imageUrl: `https://picsum.photos/seed/${categoryName.replace(/\s+/g, "-")}/150`,
        restaurantId: restaurant.id,
      }));

    const createdCategories = await prisma.category.createMany({
      data: restaurantCategories,
    });

    // Buscar as categorias recém-criadas
    const categoriesForRestaurant = await prisma.category.findMany({
      where: { restaurantId: restaurant.id },
    });

    // Criar no mínimo 6 produtos para cada restaurante, vinculando-os às categorias
    const restaurantProducts = productNames
      .slice(0, 6)
      .map((productName, index) => ({
        name: productName,
        imageUrl: `https://picsum.photos/seed/${productName.replace(/\s+/g, "-")}/150`,
        description: `Delicious ${productName}`,
        originalPrice: (Math.random() * 20 + 5).toFixed(2),
        discountPercentage: Math.floor(Math.random() * 30),
        restaurantId: restaurant.id,
        categoryId:
          categoriesForRestaurant[index % categoriesForRestaurant.length].id,
      }));

    await prisma.product.createMany({
      data: restaurantProducts,
    });
  }

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
