import mongoose from "mongoose";
import dotenv from "dotenv";
import Menu from "./models/Menu.js";

dotenv.config();

const menuItems = [
  // ARUGUREI (Earl Grey)
  {
    name: "House Blend Iced Tea",
    description: "Refreshing chilled tea blend",
    price: 140,
    category: "drink",
  },
  {
    name: "Dirty Arugurei Latte",
    description: "Earl grey latte with a twist - available hot or iced",
    price: 160,
    category: "drink",
  },
  {
    name: "Arugurei Matcha Latte",
    description: "Creamy earl grey matcha combination",
    price: 200,
    category: "drink",
  },
  {
    name: "Arugurei Hojicha Latte",
    description: "Earl grey with roasted green tea",
    price: 210,
    category: "drink",
  },

  // OCHA (Tea)
  {
    name: "Genmaicha",
    description: "Green tea blended with roasted rice",
    price: 130,
    category: "drink",
  },
  {
    name: "Sencha",
    description: "Premium Japanese green tea",
    price: 130,
    category: "drink",
  },
  {
    name: "Hojicha",
    description: "Roasted Japanese green tea",
    price: 130,
    category: "drink",
  },

  // CAFFEINE-FREE
  {
    name: "Milk Choco",
    description: "Rich chocolate milk",
    price: 130,
    category: "drink",
  },
  {
    name: "Strawberry Milk",
    description: "Sweet strawberry flavored milk",
    price: 130,
    category: "drink",
  },
  {
    name: "Choco-Berry Milk",
    description: "Chocolate and berry flavored milk",
    price: 130,
    category: "drink",
  },
  {
    name: "Steamed Babyccino",
    description: "Warm steamed milk for little ones",
    price: 50,
    category: "drink",
  },

  // SLOW BREW - KOHI
  {
    name: "Double Shot Espresso",
    description: "Rich and bold double espresso",
    price: 80,
    category: "drink",
  },
  {
    name: "Americano",
    description: "Classic americano with smooth finish",
    price: 140,
    category: "drink",
  },
  {
    name: "Latte",
    description: "Creamy espresso with steamed milk",
    price: 160,
    category: "drink",
  },
  {
    name: "Spanish Latte",
    description: "Spanish style latte with a unique twist",
    price: 170,
    category: "drink",
  },
  {
    name: "Mocha",
    description: "Chocolate and espresso blend",
    price: 170,
    category: "drink",
  },
  {
    name: "Peppermint Mocha",
    description: "Mocha infused with refreshing peppermint",
    price: 180,
    category: "drink",
  },
  {
    name: "Caramel Latte",
    description: "Smooth latte with sweet caramel",
    price: 170,
    category: "drink",
  },
  {
    name: "Salt Caramel Latte",
    description: "Latte with salted caramel complexity",
    price: 180,
    category: "drink",
  },
  {
    name: "Choco Caramel Latte",
    description: "Chocolate and caramel latte combination",
    price: 170,
    category: "drink",
  },
  {
    name: "Choco-Berry Latte",
    description: "Latte with chocolate and berry notes",
    price: 170,
    category: "drink",
  },

  // MATCHA
  {
    name: "Matcha Latte",
    description: "Creamy premium matcha latte",
    price: 180,
    category: "drink",
  },
  {
    name: "Strawberry Matcha",
    description: "Matcha blended with strawberry flavors",
    price: 190,
    category: "drink",
  },
  {
    name: "Dirty Matcha Latte",
    description: "Matcha latte with espresso shot",
    price: 210,
    category: "drink",
  },
  {
    name: "Peppermint Matcha",
    description: "Refreshing matcha with peppermint",
    price: 190,
    category: "drink",
  },
  {
    name: "Choco Matcha",
    description: "Chocolate flavored matcha latte",
    price: 190,
    category: "drink",
  },
  {
    name: "Hojicha Latte",
    description: "Creamy roasted green tea latte",
    price: 180,
    category: "drink",
  },
  {
    name: "Hojicha Oat Latte",
    description: "Hojicha with smooth oat milk",
    price: 190,
    category: "drink",
  },
  {
    name: "Strawberry Hojicha Latte",
    description: "Hojicha blended with strawberry",
    price: 200,
    category: "drink",
  },

  // SKY SEA & SUN (NEW)
  {
    name: "Aoi Cha",
    description: "Cooling blue hojicha tea mix - NEW",
    price: 160,
    category: "drink",
  },
  {
    name: "Sea Cream Matcha Latte",
    description: "Matcha with homemade sea salt cream - NEW",
    price: 210,
    category: "drink",
  },
  {
    name: "Yuhi Mocha Latte",
    description: "Refreshing mocha latte with a hint of orange - NEW",
    price: 210,
    category: "drink",
  },

  // ADD ONS
  {
    name: "Oatmilk/Milk",
    description: "Add-on: Substitute with oatmilk or extra milk",
    price: 30,
    category: "drink",
  },
  {
    name: "Extra Syrup",
    description: "Add-on: Extra syrup shot",
    price: 15,
    category: "drink",
  },
  {
    name: "Takeout",
    description: "Add-on: Takeout container",
    price: 10,
    category: "drink",
  },

  // FOOD - CROISSANT
  {
    name: "Plain Croissant",
    description: "Classic buttery croissant",
    price: 140,
    category: "food",
  },
  {
    name: "Egg and Cheese Croissant",
    description: "Croissant with egg and melted cheese",
    price: 290,
    category: "food",
  },
  {
    name: "Spicy Tuna Melt Croissant",
    description: "Crispy croissant with spicy tuna filling",
    price: 250,
    category: "food",
  },

  // FOOD - PASTA
  {
    name: "Truffle Pasta",
    description: "Pasta with luxurious truffle flavors",
    price: 390,
    category: "food",
  },
  {
    name: "Bolognese Tomato Pasta",
    description: "Classic pasta with rich tomato bolognese sauce",
    price: 360,
    category: "food",
  },
  {
    name: "Miso Pasta",
    description: "Pasta with umami miso sauce",
    price: 320,
    category: "food",
  },
  {
    name: "Aglio Pasta",
    description: "Simple aglio e olio pasta",
    price: 300,
    category: "food",
  },
  {
    name: "Carbonara Pasta",
    description: "Creamy carbonara pasta",
    price: 360,
    category: "food",
  },

  // FOOD - SALAD
  {
    name: "Caesar Salad",
    description: "Fresh salad with Caesar dressing",
    price: 240,
    category: "food",
  },
  {
    name: "Kani Salad",
    description: "Salad with crab stick and Japanese flavors",
    price: 220,
    category: "food",
  },

  // FOOD - BRUNCH
  {
    name: "Tori Sandoitchi",
    description: "Chicken sandwich with Japanese flavors",
    price: 310,
    category: "food",
  },
  {
    name: "Dori Sandoitchi",
    description: "Japanese style sandwich",
    price: 310,
    category: "food",
  },
  {
    name: "Miso Caramel Pancake",
    description: "Fluffy pancake with miso caramel glaze",
    price: 220,
    category: "food",
  },

  // DESSERT - TAIYAKI
  {
    name: "Plain Taiyaki",
    description: "Classic fish-shaped cake",
    price: 110,
    category: "dessert",
  },
  {
    name: "Adzuki Taiyaki",
    description: "Taiyaki filled with sweet adzuki beans",
    price: 120,
    category: "dessert",
  },
  {
    name: "Choco Taiyaki",
    description: "Taiyaki filled with chocolate",
    price: 120,
    category: "dessert",
  },
  {
    name: "Strawberry Taiyaki",
    description: "Taiyaki filled with sweet strawberry",
    price: 170,
    category: "dessert",
  },

  // DESSERT - CHIPSU (Chips)
  {
    name: "Traditional Chipsu",
    description: "Classic flavored chips",
    price: 120,
    category: "dessert",
  },
  {
    name: "Wasabi Chipsu",
    description: "Spicy wasabi flavored chips",
    price: 120,
    category: "dessert",
  },
  {
    name: "Curry Chipsu",
    description: "Aromatic curry flavored chips",
    price: 120,
    category: "dessert",
  },

  // DESSERT - ONIGIRI
  {
    name: "Shio Onigiri",
    description: "Rice ball with salt",
    price: 50,
    category: "dessert",
  },
  {
    name: "Tsunamayo Onigiri",
    description: "Rice ball with tuna and mayo",
    price: 70,
    category: "dessert",
  },
  {
    name: "Furikake Onigiri",
    description: "Rice ball with seasoning mix",
    price: 70,
    category: "dessert",
  },

  // DESSERT - KARAAGE
  {
    name: "Karaage Sharing",
    description: "Japanese fried chicken - Sharing set",
    price: 300,
    category: "dessert",
  },
  {
    name: "Karaage Solo Set",
    description: "Japanese fried chicken - Individual set",
    price: 200,
    category: "dessert",
  },

  // DESSERT - KOROKKE
  {
    name: "Korokke",
    description: "Japanese croquette with creamy filling",
    price: 190,
    category: "dessert",
  },
];

const seedMenu = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing menu items
    await Menu.deleteMany({});
    console.log("Cleared existing menu items");

    // Insert new menu items
    const insertedItems = await Menu.insertMany(menuItems);
    console.log(`Successfully seeded ${insertedItems.length} menu items`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding menu:", error);
    process.exit(1);
  }
};

seedMenu();
