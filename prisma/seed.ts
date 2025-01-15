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

  const restaurants = await Promise.all(
    restaurantNames.map((name) =>
      prisma.restaurant.create({
        data: {
          name,
          imageUrl: `https://picsum.photos/seed/${name.replace(
            /\s+/g,
            "-",
          )}/150`,
          deliveryFee: 5,
          deliveryTime: Math.floor(Math.random() * 30) + 10,
        },
      }),
    ),
  );

  const categories = await Promise.all(
    ["Sucos", "Pratos", "Lanches", "Pizzas", "Sobremesas", "Bebidas"].map(
      (categoryName, index) =>
        prisma.category.create({
          data: {
            name: categoryName,
            imageUrl: `https://picsum.photos/seed/${categoryName.replace(
              /\s+/g,
              "-",
            )}/150`,
            restaurantId: restaurants[index % restaurants.length].id,
          },
        }),
    ),
  );

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

  const products = await Promise.all(
    productNames.map((productName) =>
      prisma.product.create({
        data: {
          name: productName,
          imageUrl: `https://picsum.photos/seed/${productName.replace(
            /\s+/g,
            "-",
          )}/150`,
          description: `Delicious ${productName}`,
          originalPrice: (Math.random() * 20 + 5).toFixed(2),
          discountPercentage: Math.floor(Math.random() * 30),
          restaurantId:
            restaurants[Math.floor(Math.random() * restaurants.length)].id,
          categoryId:
            categories[Math.floor(Math.random() * categories.length)].id,
        },
      }),
    ),
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
