import mongoose from 'mongoose';
export { mongoose };
import { User } from '../models/User.js';
import { Vendor } from '../models/Vendor.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';
import { Category } from '../models/Category.js';
import { Section } from '../models/Section.js';
import { Video } from '../models/Video.js';

export let lastDbError: string | null = null;

export async function connectDb() {
  console.log("connectDb function started, Mongoose version:", mongoose.version);
  let MONGODB_URI = process.env.MONGODB_URI?.trim();
  
  // Remove surrounding quotes if they exist
  if (MONGODB_URI && (MONGODB_URI.startsWith('"') || MONGODB_URI.startsWith("'"))) {
    MONGODB_URI = MONGODB_URI.substring(1, MONGODB_URI.length - 1);
  }
  
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not set. Falling back to local MongoDB.');
  }

  const connectionString = (MONGODB_URI && MONGODB_URI !== 'localhost' && MONGODB_URI !== '127.0.0.1') 
    ? MONGODB_URI 
    : 'mongodb://localhost:27017/Omni?retryWrites=true&w=majority';
  
  console.log(`Attempting to connect to MongoDB: ${connectionString.replace(/\/\/.*@/, '//****:****@')}`);
  
  mongoose.connection.on('connected', () => console.log('Mongoose connected to DB'));
  mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
  mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

  if (!MONGODB_URI) {
    console.log('Using default connection string');
  } else {
    console.log('Using MONGODB_URI from environment');
  }
  
  if (!connectionString.startsWith('mongodb://') && !connectionString.startsWith('mongodb+srv://')) {
    throw new Error(`Invalid MONGODB_URI scheme. Expected "mongodb://" or "mongodb+srv://".`);
  }

  try {
    console.log("ReadyState before connect:", mongoose.connection.readyState);
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of default 30s
      connectTimeoutMS: 10000,
    });
    console.log("ReadyState after connect:", mongoose.connection.readyState);
    console.log('Connected to MongoDB successfully');
    
    // Check if we need to seed
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await seedDb();
    }
  } catch (err) {
    lastDbError = err instanceof Error ? err.message : String(err);
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

async function seedDb() {
  console.log('Seeding MongoDB with dummy data...');
  
  try {
    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Vendor.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Category.deleteMany({}),
      Section.deleteMany({}),
      Video.deleteMany({})
    ]);

    // Create Users
    const users = await User.insertMany([
      { email: 'admin@omnimarket.com', password: 'admin123', name: 'Global Admin', role: 'administrator' },
      { email: 'fashion@vendor.com', password: 'vendor123', name: 'Elena Rossi', role: 'vendor' },
      { email: 'tech@vendor.com', password: 'vendor123', name: 'Alex Chen', role: 'vendor' },
      { email: 'handmade@vendor.com', password: 'vendor123', name: 'Sarah Miller', role: 'vendor' },
      { email: 'digital@vendor.com', password: 'vendor123', name: 'David Wright', role: 'vendor' },
      { email: 'customer@demo.com', password: 'customer123', name: 'Jane Doe', role: 'customer' },
      { email: 'bob@demo.com', password: 'customer123', name: 'Bob Smith', role: 'customer' },
      { email: 'beauty@vendor.com', password: 'vendor123', name: 'Sophia Loren', role: 'vendor' }
    ]);

    const admin = users[0];
    const fashionVendorUser = users[1];
    const techVendorUser = users[2];
    const handmadeVendorUser = users[3];
    const digitalVendorUser = users[4];
    const customer = users[5];
    const beautyVendorUser = users[7];

    // Create Vendors
    const vendors = await Vendor.insertMany([
      { user_id: fashionVendorUser._id, business_name: 'Luxe Threads', description: 'Premium Italian-inspired fashion.', status: 'active' },
      { user_id: techVendorUser._id, business_name: 'Circuit City', description: 'Cutting edge electronics and gadgets.', status: 'active' },
      { user_id: handmadeVendorUser._id, business_name: 'Rustic Roots', description: 'Handcrafted home decor and accessories.', status: 'active' },
      { user_id: digitalVendorUser._id, business_name: 'Pixel Perfect', description: 'High-quality digital assets and software.', status: 'active' },
      { user_id: beautyVendorUser._id, business_name: 'Glow & Grace', description: 'Organic beauty and skincare products.', status: 'active' }
    ]);

    const fashionVendor = vendors[0];
    const techVendor = vendors[1];
    const handmadeVendor = vendors[2];
    const digitalVendor = vendors[3];
    const beautyVendor = vendors[4];

    // Create Categories
    const categories = await Category.insertMany([
      { name: 'Groceries', slug: 'groceries', icon: 'ShoppingBag', order: 1 },
      { name: 'Electronics', slug: 'electronics', icon: 'Monitor', order: 2 },
      { name: 'Clothing', slug: 'clothing', icon: 'Tag', order: 3 },
      { name: 'Home Decor', slug: 'home-decor', icon: 'Home', order: 4 },
      { name: 'Handmade', slug: 'handmade', icon: 'Store', order: 5 },
      { name: 'Software', slug: 'software', icon: 'Zap', order: 6 },
      { name: 'Subscription', slug: 'subscription', icon: 'Clock', order: 7 },
      { name: 'Beauty', slug: 'beauty', icon: 'Sparkles', order: 8 }
    ]);

    // Create Sections
    await Section.insertMany([
      { title: "Pick up where you left off", icon: "History", type: "products", limit: 12, order: 1 },
      { title: "Continue shopping deals", icon: "Tag", type: "products", limit: 12, order: 2 },
      { title: "Buy again", icon: "RefreshCcw", type: "products", limit: 12, order: 3 },
      { title: "Keep shopping for", icon: "Search", type: "products", limit: 12, order: 4 },
      { title: "Deals on popular reorders", icon: "Flame", type: "products", limit: 12, order: 5 },
      { title: "Inspired by your browsing history", icon: "Sparkles", type: "products", limit: 12, order: 6 },
      { title: "Customers’ Most-Loved Fashion", icon: "Heart", type: "category", category: "Clothing", limit: 12, order: 7 },
      { title: "Up to 60% Off | Smart furniture", icon: "Monitor", type: "category", category: "Home Decor", limit: 12, order: 8 },
      { title: "Min.35% off | Small Businesses", icon: "Store", type: "category", category: "Handmade", limit: 12, order: 9 },
      { title: "Best Sellers in Computers", icon: "Monitor", type: "category", category: "Electronics", limit: 12, order: 10 },
      { title: "Best Sellers in Beauty", icon: "Sparkles", type: "category", category: "Beauty", limit: 12, order: 11 }
    ]);

    // Create Videos
    await Video.insertMany([
      { title: "Unboxing the New UltraPhone", thumbnail: "https://picsum.photos/seed/v1/400/225", views: "1.2M", type: "Unboxing" },
      { title: "Review: Minimalist Desk Setup", thumbnail: "https://picsum.photos/seed/v2/400/225", views: "850K", type: "Review" },
      { title: "Fashion Haul: Spring 2026", thumbnail: "https://picsum.photos/seed/v3/400/225", views: "2.5M", type: "Haul" },
      { title: "Handmade Pottery Process", thumbnail: "https://picsum.photos/seed/v4/400/225", views: "420K", type: "Process" }
    ]);

    // Create Products
    await Product.insertMany([
      {
        vendor_id: fashionVendor._id,
        name: 'Minimalist Linen Shirt',
        slug: 'minimalist-linen-shirt',
        description: 'Breathable organic linen shirt.',
        price: 89.99,
        category: 'Clothing',
        type: 'physical',
        stock: 50,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'],
        metadata: { colors: ['White', 'Beige'], sizes: ['S', 'M', 'L'] }
      },
      {
        vendor_id: fashionVendor._id,
        name: 'Silk Evening Gown',
        slug: 'silk-evening-gown',
        description: 'Elegant 100% mulberry silk gown.',
        price: 249.50,
        category: 'Clothing',
        type: 'physical',
        stock: 15,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'],
        metadata: { colors: ['Midnight Blue', 'Emerald'], sizes: ['XS', 'S', 'M'] }
      },
      {
        vendor_id: techVendor._id,
        name: 'Cyberpunk Headphones',
        slug: 'cyberpunk-headphones',
        description: 'High-fidelity audio with neon accents.',
        price: 299.00,
        category: 'Electronics',
        type: 'physical',
        stock: 20,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
        metadata: { specs: { battery: '40h', noise_cancelling: true } }
      },
      {
        vendor_id: techVendor._id,
        name: 'Quantum Smartwatch',
        slug: 'quantum-smartwatch',
        description: 'Next-gen health tracking and holographic display.',
        price: 450.00,
        category: 'Electronics',
        type: 'physical',
        stock: 30,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
        metadata: { specs: { waterproof: true, sensors: ['ECG', 'SpO2'] } }
      },
      {
        vendor_id: handmadeVendor._id,
        name: 'Ceramic Vase',
        slug: 'ceramic-vase',
        description: 'Hand-thrown ceramic vase with matte finish.',
        price: 45.00,
        category: 'Home Decor',
        type: 'physical',
        stock: 10,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80']
      },
      {
        vendor_id: beautyVendor._id,
        name: 'Organic Face Oil',
        slug: 'organic-face-oil',
        description: 'Nourishing blend of cold-pressed oils.',
        price: 32.00,
        category: 'Beauty',
        type: 'physical',
        stock: 100,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80']
      },
      {
        vendor_id: techVendor._id,
        name: 'Mechanical Keyboard',
        slug: 'mechanical-keyboard',
        description: 'Tactile switches and customizable RGB.',
        price: 159.99,
        category: 'Electronics',
        type: 'physical',
        stock: 25,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80']
      },
      {
        vendor_id: fashionVendor._id,
        name: 'Leather Boots',
        slug: 'leather-boots',
        description: 'Handcrafted Italian leather boots.',
        price: 189.00,
        category: 'Clothing',
        type: 'physical',
        stock: 20,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1520639889313-7272a74b1c73?auto=format&fit=crop&w=800&q=80']
      }
    ]);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Seeding error:', err);
  }
}
