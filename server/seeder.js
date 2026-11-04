import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();

const sampleProducts = [
  {
    name: "Sony WH-1000XM5 ANC Headphones",
    description: "Industry-leading noise canceling over-ear headphones with 30-hour battery life.",
    category: "Electronics",
    price: 24999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    stock: 12,
    rating: 4.9,
  },
  {
    name: "Keychron K2 Mechanical Keyboard",
    description: "Compact wireless mechanical keyboard with tactile brown switches and RGB backlighting.",
    category: "Electronics",
    price: 8499,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    stock: 18,
    rating: 4.8,
  },
  {
    name: "Apple Watch Ultra Titanium",
    description: "Rugged 49mm titanium smartwatch with precision dual-frequency GPS.",
    category: "Wearables",
    price: 49999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    stock: 8,
    rating: 4.9,
  },
  {
    name: "Logitech MX Master 3S Mouse",
    description: "Quiet clicks, 8K DPI any-surface tracking sensor, MagSpeed electromagnetic wheel.",
    category: "Electronics",
    price: 9495,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80",
    stock: 25,
    rating: 4.8,
  },
  {
    name: "Peak Design Commuter Backpack",
    description: "Weatherproof 20L recycled nylon canvas backpack with customizable internal dividers.",
    category: "Accessories",
    price: 18999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    stock: 10,
    rating: 4.7,
  },
  {
    name: "Anker MagSafe Wireless Power Bank",
    description: "Magnetic wireless portable battery pack with built-in foldable kickstand.",
    category: "Accessories",
    price: 4499,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
    stock: 22,
    rating: 4.6,
  },
  {
    name: "AirPods Pro 2nd Gen",
    description: "Active noise cancellation, adaptive transparency, and personalized spatial audio.",
    category: "Electronics",
    price: 21500,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80",
    stock: 16,
    rating: 4.9,
  },
  {
    name: "Samsung Galaxy Watch6 Classic",
    description: "Iconic rotating bezel, body composition analysis, and sapphire crystal display.",
    category: "Wearables",
    price: 28999,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80",
    stock: 14,
    rating: 4.5,
  },
  {
    name: "Minimalist Leather Cardholder",
    description: "Slim RFID-blocking genuine leather wallet with quick card-pull access.",
    category: "Accessories",
    price: 1999,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    stock: 30,
    rating: 4.5,
  },
  {
    name: "Insta360 Action Camera 4K",
    description: "Ultra-compact waterproof pocket action cam with FlowState stabilization.",
    category: "Electronics",
    price: 32999,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",
    stock: 9,
    rating: 4.7,
  },
  {
    name: "Felt Laptop Desk Mat & Pad",
    description: "Large anti-slip wool felt desk mat with water-resistant surface coating.",
    category: "Accessories",
    price: 1499,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    stock: 35,
    rating: 4.6,
  },
  {
    name: "Garmin Forerunner Sports Watch",
    description: "Lightweight multisport running watch with HRV status and daily suggested workouts.",
    category: "Wearables",
    price: 39990,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80",
    stock: 7,
    rating: 4.8,
  },
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("✅ 12 All-Different Products Database mein load ho gaye!");
    process.exit();
  } catch (error) {
    console.error(`❌ Seeder Error: ${error.message}`);
    process.exit(1);
  }
};

importData();