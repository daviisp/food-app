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

  for (const restaurantName of restaurantNames) {
    const restaurant = await prisma.restaurant.create({
      data: {
        name: restaurantName,
        imageUrl: `https://picsum.photos/seed/${restaurantName.replace(/\s+/g, "-")}/150`,
        deliveryFee: 5,
        deliveryTime: Math.floor(Math.random() * 30) + 10,
      },
    });

    const categories = [];
    for (let i = 0; i < 6; i++) {
      const category = await prisma.category.create({
        data: {
          name: categoryNames[i % categoryNames.length],
          imageUrl: `https://picsum.photos/seed/${categoryNames[i].replace(/\s+/g, "-")}/150`,
          restaurantId: restaurant.id,
        },
      });
      categories.push(category);
    }

    for (const category of categories) {
      for (let i = 0; i < 6; i++) {
        await prisma.product.create({
          data: {
            name: productNames[i % productNames.length],
            imageUrl: `https://picsum.photos/seed/${productNames[i].replace(/\s+/g, "-")}/150`,
            description: `Delicious ${productNames[i]}`,
            originalPrice: (Math.random() * 20 + 5).toFixed(2),
            discountPercentage: Math.floor(Math.random() * 30),
            restaurantId: restaurant.id,
            categoryId: category.id,
          },
        });
      }
    }
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
