require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const FoodItem = require('../models/FoodItem');
const Restaurant = require('../models/Restaurant');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/food_delivery';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data

    await User.deleteMany({});
    await FoodItem.deleteMany({});
    await Restaurant.deleteMany({});


    // Seed a Restaurant (required for FoodItem)
    const restaurant = await Restaurant.create({
      restaurantName: 'QuickBite',
      branchName: 'Main Branch',
      email: 'quickbite@food.com',
      password: await bcrypt.hash('quickbite123', 10),
      isLoggedIn: false,
      isActive: true,
    });
    console.log('Restaurant seeded');

    // Seed Admin User
    const adminPassword = '$2a$10$f44gi7UKWL.yPsDRQHLDkOQnIww4PX/o540wVBszrQOdySDKcE502'; // already bcrypt hash for 'admin123'
    await User.create({
      name: 'Admin',
      email: 'admin@food.com',
      password: adminPassword,
      role: 'admin',
    });
    console.log('Admin user seeded');

    // Seed Food Items (all linked to the above restaurant)
    const foodItems = [
      {
        food_name: 'Margherita Pizza',
        description: 'Classic pizza with fresh tomato sauce, mozzarella, and basil leaves.',
        price: 149.00,
        category: 'Pizza',
        image: 'pizza1.jpg',
        is_featured: true,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Pepperoni Feast',
        description: 'Loaded with spicy pepperoni slices and extra cheese on a crispy base.',
        price: 179.00,
        category: 'Pizza',
        image: 'pizza2.jpg',
        is_featured: true,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'BBQ Chicken Burger',
        description: 'Juicy grilled chicken with BBQ sauce, lettuce, and pickles in a sesame bun.',
        price: 119.00,
        category: 'Burger',
        image: 'burger1.jpg',
        is_featured: true,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Double Smash Burger',
        description: 'Two smashed beef patties with American cheese, onions, and special sauce.',
        price: 149.00,
        category: 'Burger',
        image: 'burger2.jpg',
        is_featured: false,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Veg Burger',
        description: 'Crispy veggie patty with fresh veggies and mayo in a toasted bun.',
        price: 99.00,
        category: 'Burger',
        image: 'burger3.jpg',
        is_featured: false,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Chicken Biryani',
        description: 'Aromatic basmati rice cooked with tender chicken, saffron, and spices.',
        price: 159.00,
        category: 'Biryani',
        image: 'biryani1.jpg',
        is_featured: true,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Veg Biryani',
        description: 'Fragrant rice with fresh vegetables, mint, and whole spices.',
        price: 129.00,
        category: 'Biryani',
        image: 'biryani2.jpg',
        is_featured: false,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Mutton Biryani',
        description: 'Slow-cooked mutton with premium basmati rice and dum spices.',
        price: 199.00,
        category: 'Biryani',
        image: 'biryani3.jpg',
        is_featured: false,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Cold Coffee',
        description: 'Creamy cold coffee blended with ice cream and topped with whipped cream.',
        price: 89.00,
        category: 'Drinks',
        image: 'drink1.jpg',
        is_featured: false,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Mango Lassi',
        description: 'Thick and refreshing mango lassi made with fresh mangoes and yogurt.',
        price: 79.00,
        category: 'Drinks',
        image: 'drink2.jpg',
        is_featured: true,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Fresh Lime Soda',
        description: 'Chilled soda with fresh lime juice, mint, and a hint of salt.',
        price: 59.00,
        category: 'Drinks',
        image: 'drink3.jpg',
        is_featured: false,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey molten center served with vanilla ice cream.',
        price: 129.00,
        category: 'Desserts',
        image: 'dessert1.jpg',
        is_featured: true,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Gulab Jamun (6 pcs)',
        description: 'Soft milk-solid balls soaked in rose-flavored sugar syrup.',
        price: 89.00,
        category: 'Desserts',
        image: 'dessert2.jpg',
        is_featured: false,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Masala French Fries',
        description: 'Crispy golden fries tossed with chaat masala, chili, and lemon.',
        price: 79.00,
        category: 'Snacks',
        image: 'snack1.jpg',
        is_featured: false,
        restaurantId: restaurant._id,
      },
      {
        food_name: 'Paneer Tikka (6 pcs)',
        description: 'Marinated and grilled paneer cubes with capsicum and onion in a spicy masala.',
        price: 139.00,
        category: 'Snacks',
        image: 'snack2.jpg',
        is_featured: false,
        restaurantId: restaurant._id,
      },
    ];

    await FoodItem.insertMany(foodItems);
    console.log('Food items seeded');

    await mongoose.disconnect();
    console.log('Seeding complete. Disconnected from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
