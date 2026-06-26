import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String }, // Icon name from lucide-react
  description: { type: String },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
});

export const Category = mongoose.model('Category', categorySchema);
