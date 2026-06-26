import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  type: { type: String, enum: ['physical', 'digital'], default: 'physical' },
  stock: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive', 'out_of_stock'], default: 'active' },
  images: [{ type: String }],
  metadata: { type: Map, of: mongoose.Schema.Types.Mixed },
  created_at: { type: Date, default: Date.now }
});

export const Product = mongoose.model('Product', productSchema);
