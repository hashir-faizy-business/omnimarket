import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String }, // Icon name from lucide-react
  type: { type: String, enum: ['products', 'category', 'custom'], default: 'products' },
  category: { type: String }, // If type is category
  limit: { type: Number, default: 12 },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
});

export const Section = mongoose.model('Section', sectionSchema);
