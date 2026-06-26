import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Product } from '../models/Product.js';

export const getAllProducts = async (req: Request, res: Response) => {
  const isConnected = mongoose.connection.readyState === 1;

  if (!isConnected) {
    console.warn("Database not connected. Returning sample data fallback.");
    return res.json([
      { 
        id: 'sample-1', 
        name: 'Classic Linen Shirt', 
        price: 89.99, 
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'], 
        slug: 'minimalist-linen-shirt',
        category: 'Clothing',
        vendor_name: 'Luxe Threads (Sample)'
      },
      { 
        id: 'sample-2', 
        name: 'Cyberpunk Headphones', 
        price: 299.00, 
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'], 
        slug: 'cyberpunk-headphones',
        category: 'Electronics',
        vendor_name: 'Circuit City (Sample)'
      }
    ]);
  }

  try {
    console.log("Fetching products from DB...");
    const products = await Product.find({ status: 'active' }).populate('vendor_id', 'business_name');
    console.log(`Found ${products.length} products`);
    
    if (products.length === 0) {
      // If connected but empty, return the controller's dummy data
      return res.json([{ 
        id: 'dummy-1', 
        name: 'Sample Product', 
        price: 99.99, 
        images: ['https://picsum.photos/seed/product/800/800'], 
        slug: 'sample-product',
        category: 'Electronics',
        vendor_name: 'Demo Vendor'
      }]);
    }

    res.json(products.map(p => {
      const obj = p.toObject();
      return {
        ...obj,
        id: p._id,
        vendor_name: (p.vendor_id as any)?.business_name || 'Unknown Vendor'
      };
    }));
  } catch (e) {
    console.error("Error in getAllProducts:", e);
    res.status(500).json({ error: "Failed to fetch products", details: e instanceof Error ? e.message : String(e) });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('vendor_id', 'business_name');
    if (product) {
      const obj = product.toObject();
      res.json({
        ...obj,
        id: product._id,
        vendor_name: (product.vendor_id as any)?.business_name || 'Unknown Vendor'
      });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (e) {
    console.error("Error in getProductBySlug:", e);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};
