import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'backend', 'data');

// Create the data directory if it does not exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function readCollection<T>(collectionName: string): T[] {
  const filePath = path.join(DATA_DIR, `${collectionName}.json`);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading collection ${collectionName}:`, err);
    return [];
  }
}

export function writeCollection<T>(collectionName: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, `${collectionName}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing collection ${collectionName}:`, err);
  }
}

// Automatic database seeding on initialization
export function initializeJsonDb() {
  console.log('Initializing local JSON DB...');
  
  const usersPath = path.join(DATA_DIR, 'users.json');
  const vendorsPath = path.join(DATA_DIR, 'vendors.json');
  const categoriesPath = path.join(DATA_DIR, 'categories.json');
  const sectionsPath = path.join(DATA_DIR, 'sections.json');
  const videosPath = path.join(DATA_DIR, 'videos.json');
  const productsPath = path.join(DATA_DIR, 'products.json');
  const ordersPath = path.join(DATA_DIR, 'orders.json');

  const filesToSeed = [usersPath, vendorsPath, categoriesPath, sectionsPath, videosPath, productsPath, ordersPath];
  const needsSeeding = filesToSeed.some(file => !fs.existsSync(file) || fs.readFileSync(file, 'utf-8').trim() === '[]' || fs.readFileSync(file, 'utf-8').trim() === '');

  if (needsSeeding) {
    console.log('Local JSON files missing or empty. Seeding local JSON DB...');

    // Define mock ObjectIds as string hex IDs
    const userIds = {
      admin: '507f1f77bcf86cd799439011',
      fashionVendor: '507f1f77bcf86cd799439012',
      techVendor: '507f1f77bcf86cd799439013',
      handmadeVendor: '507f1f77bcf86cd799439014',
      digitalVendor: '507f1f77bcf86cd799439015',
      customer: '507f1f77bcf86cd799439016',
      bob: '507f1f77bcf86cd799439017',
      beautyVendor: '507f1f77bcf86cd799439018'
    };

    const vendorIds = {
      fashion: '507f1f77bcf86cd799439021',
      tech: '507f1f77bcf86cd799439022',
      handmade: '507f1f77bcf86cd799439023',
      digital: '507f1f77bcf86cd799439024',
      beauty: '507f1f77bcf86cd799439025'
    };

    const users = [
      { id: userIds.admin, email: 'admin@omnimarket.com', password: 'admin123', name: 'Global Admin', role: 'administrator', status: 'active', created_at: new Date().toISOString() },
      { id: userIds.fashionVendor, email: 'fashion@vendor.com', password: 'vendor123', name: 'Elena Rossi', role: 'vendor', status: 'active', created_at: new Date().toISOString() },
      { id: userIds.techVendor, email: 'tech@vendor.com', password: 'vendor123', name: 'Alex Chen', role: 'vendor', status: 'active', created_at: new Date().toISOString() },
      { id: userIds.handmadeVendor, email: 'handmade@vendor.com', password: 'vendor123', name: 'Sarah Miller', role: 'vendor', status: 'active', created_at: new Date().toISOString() },
      { id: userIds.digitalVendor, email: 'digital@vendor.com', password: 'vendor123', name: 'David Wright', role: 'vendor', status: 'active', created_at: new Date().toISOString() },
      { id: userIds.customer, email: 'customer@demo.com', password: 'customer123', name: 'Jane Doe', role: 'customer', status: 'active', created_at: new Date().toISOString() },
      { id: userIds.bob, email: 'bob@demo.com', password: 'customer123', name: 'Bob Smith', role: 'customer', status: 'active', created_at: new Date().toISOString() },
      { id: userIds.beautyVendor, email: 'beauty@vendor.com', password: 'vendor123', name: 'Sophia Loren', role: 'vendor', status: 'active', created_at: new Date().toISOString() }
    ];

    const vendors = [
      { id: vendorIds.fashion, user_id: userIds.fashionVendor, business_name: 'Luxe Threads', description: 'Premium Italian-inspired fashion.', status: 'active', created_at: new Date().toISOString() },
      { id: vendorIds.tech, user_id: userIds.techVendor, business_name: 'Circuit City', description: 'Cutting edge electronics and gadgets.', status: 'active', created_at: new Date().toISOString() },
      { id: vendorIds.handmade, user_id: userIds.handmadeVendor, business_name: 'Rustic Roots', description: 'Handcrafted home decor and accessories.', status: 'active', created_at: new Date().toISOString() },
      { id: vendorIds.digital, user_id: userIds.digitalVendor, business_name: 'Pixel Perfect', description: 'High-quality digital assets and software.', status: 'active', created_at: new Date().toISOString() },
      { id: vendorIds.beauty, user_id: userIds.beautyVendor, business_name: 'Glow & Grace', description: 'Organic beauty and skincare products.', status: 'active', created_at: new Date().toISOString() }
    ];

    const categories = [
      { name: 'Groceries', slug: 'groceries', icon: 'ShoppingBag', order: 1, active: true },
      { name: 'Electronics', slug: 'electronics', icon: 'Monitor', order: 2, active: true },
      { name: 'Clothing', slug: 'clothing', icon: 'Tag', order: 3, active: true },
      { name: 'Home Decor', slug: 'home-decor', icon: 'Home', order: 4, active: true },
      { name: 'Handmade', slug: 'handmade', icon: 'Store', order: 5, active: true },
      { name: 'Software', slug: 'software', icon: 'Zap', order: 6, active: true },
      { name: 'Subscription', slug: 'subscription', icon: 'Clock', order: 7, active: true },
      { name: 'Beauty', slug: 'beauty', icon: 'Sparkles', order: 8, active: true }
    ];

    const sections = [
      { title: "Pick up where you left off", icon: "History", type: "products", limit: 12, order: 1, active: true },
      { title: "Continue shopping deals", icon: "Tag", type: "products", limit: 12, order: 2, active: true },
      { title: "Buy again", icon: "RefreshCcw", type: "products", limit: 12, order: 3, active: true },
      { title: "Keep shopping for", icon: "Search", type: "products", limit: 12, order: 4, active: true },
      { title: "Deals on popular reorders", icon: "Flame", type: "products", limit: 12, order: 5, active: true },
      { title: "Inspired by your browsing history", icon: "Sparkles", type: "products", limit: 12, order: 6, active: true },
      { title: "Customers’ Most-Loved Fashion", icon: "Heart", type: "category", category: "Clothing", limit: 12, order: 7, active: true },
      { title: "Up to 60% Off | Smart furniture", icon: "Monitor", type: "category", category: "Home Decor", limit: 12, order: 8, active: true },
      { title: "Min.35% off | Small Businesses", icon: "Store", type: "category", category: "Handmade", limit: 12, order: 9, active: true },
      { title: "Best Sellers in Computers", icon: "Monitor", type: "category", category: "Electronics", limit: 12, order: 10, active: true },
      { title: "Best Sellers in Beauty", icon: "Sparkles", type: "category", category: "Beauty", limit: 12, order: 11, active: true }
    ];

    const videos = [
      { id: '1', title: "Unboxing the New UltraPhone", thumbnail: "https://picsum.photos/seed/v1/400/225", views: "1.2M", type: "Unboxing", created_at: new Date().toISOString() },
      { id: '2', title: "Review: Minimalist Desk Setup", thumbnail: "https://picsum.photos/seed/v2/400/225", views: "850K", type: "Review", created_at: new Date().toISOString() },
      { id: '3', title: "Fashion Haul: Spring 2026", thumbnail: "https://picsum.photos/seed/v3/400/225", views: "2.5M", type: "Haul", created_at: new Date().toISOString() },
      { id: '4', title: "Handmade Pottery Process", thumbnail: "https://picsum.photos/seed/v4/400/225", views: "420K", type: "Process", created_at: new Date().toISOString() }
    ];

    const products = [
      {
        id: '507f1f77bcf86cd799439031',
        vendor_id: vendorIds.fashion,
        name: 'Minimalist Linen Shirt',
        slug: 'minimalist-linen-shirt',
        description: 'Breathable organic linen shirt.',
        price: 89.99,
        category: 'Clothing',
        type: 'physical',
        stock: 50,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'],
        metadata: { colors: ['White', 'Beige'], sizes: ['S', 'M', 'L'] },
        created_at: new Date().toISOString()
      },
      {
        id: '507f1f77bcf86cd799439032',
        vendor_id: vendorIds.fashion,
        name: 'Silk Evening Gown',
        slug: 'silk-evening-gown',
        description: 'Elegant 100% mulberry silk gown.',
        price: 249.50,
        category: 'Clothing',
        type: 'physical',
        stock: 15,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'],
        metadata: { colors: ['Midnight Blue', 'Emerald'], sizes: ['XS', 'S', 'M'] },
        created_at: new Date().toISOString()
      },
      {
        id: '507f1f77bcf86cd799439033',
        vendor_id: vendorIds.tech,
        name: 'Cyberpunk Headphones',
        slug: 'cyberpunk-headphones',
        description: 'High-fidelity audio with neon accents.',
        price: 299.00,
        category: 'Electronics',
        type: 'physical',
        stock: 20,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
        metadata: { specs: { battery: '40h', noise_cancelling: true } },
        created_at: new Date().toISOString()
      },
      {
        id: '507f1f77bcf86cd799439034',
        vendor_id: vendorIds.tech,
        name: 'Quantum Smartwatch',
        slug: 'quantum-smartwatch',
        description: 'Next-gen health tracking and holographic display.',
        price: 450.00,
        category: 'Electronics',
        type: 'physical',
        stock: 30,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
        metadata: { specs: { waterproof: true, sensors: ['ECG', 'SpO2'] } },
        created_at: new Date().toISOString()
      },
      {
        id: '507f1f77bcf86cd799439035',
        vendor_id: vendorIds.handmade,
        name: 'Ceramic Vase',
        slug: 'ceramic-vase',
        description: 'Hand-thrown ceramic vase with matte finish.',
        price: 45.00,
        category: 'Home Decor',
        type: 'physical',
        stock: 10,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80'],
        created_at: new Date().toISOString()
      },
      {
        id: '507f1f77bcf86cd799439036',
        vendor_id: vendorIds.beauty,
        name: 'Organic Face Oil',
        slug: 'organic-face-oil',
        description: 'Nourishing blend of cold-pressed oils.',
        price: 32.00,
        category: 'Beauty',
        type: 'physical',
        stock: 100,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'],
        created_at: new Date().toISOString()
      },
      {
        id: '507f1f77bcf86cd799439037',
        vendor_id: vendorIds.tech,
        name: 'Mechanical Keyboard',
        slug: 'mechanical-keyboard',
        description: 'Tactile switches and customizable RGB.',
        price: 159.99,
        category: 'Electronics',
        type: 'physical',
        stock: 25,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80'],
        created_at: new Date().toISOString()
      },
      {
        id: '507f1f77bcf86cd799439038',
        vendor_id: vendorIds.fashion,
        name: 'Leather Boots',
        slug: 'leather-boots',
        description: 'Handcrafted Italian leather boots.',
        price: 189.00,
        category: 'Clothing',
        type: 'physical',
        stock: 20,
        status: 'active',
        images: ['https://images.unsplash.com/photo-1520639889313-7272a74b1c73?auto=format&fit=crop&w=800&q=80'],
        created_at: new Date().toISOString()
      }
    ];

    const orders: any[] = [];

    writeCollection('users', users);
    writeCollection('vendors', vendors);
    writeCollection('categories', categories);
    writeCollection('sections', sections);
    writeCollection('videos', videos);
    writeCollection('products', products);
    writeCollection('orders', orders);

    console.log('Seeding local JSON DB completed successfully!');
  } else {
    console.log('Local JSON DB files exist. Skipping seed.');
  }
}
