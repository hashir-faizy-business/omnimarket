import { Request, Response } from 'express';
import { readCollection } from '../config/jsonDb.js';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("Fetching products from Local JSON DB...");
    const products = readCollection<any>('products');
    const vendors = readCollection<any>('vendors');

    const activeProducts = products.filter(p => p.status === 'active');
    console.log(`Found ${activeProducts.length} active products`);

    const populated = activeProducts.map(p => {
      const vendor = vendors.find(v => v.id === p.vendor_id || v._id === p.vendor_id);
      return {
        ...p,
        id: p.id || p._id,
        vendor_name: vendor ? vendor.business_name : 'Unknown Vendor'
      };
    });

    res.json(populated);
  } catch (e) {
    console.error("Error in getAllProducts:", e);
    res.status(500).json({ error: "Failed to fetch products", details: e instanceof Error ? e.message : String(e) });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const products = readCollection<any>('products');
    const vendors = readCollection<any>('vendors');
    
    const product = products.find(p => p.slug === req.params.slug);
    if (product) {
      const vendor = vendors.find(v => v.id === product.vendor_id || v._id === product.vendor_id);
      res.json({
        ...product,
        id: product.id || product._id,
        vendor_name: vendor ? vendor.business_name : 'Unknown Vendor'
      });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (e) {
    console.error("Error in getProductBySlug:", e);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};
