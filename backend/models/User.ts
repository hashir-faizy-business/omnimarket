import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['customer', 'vendor', 'administrator'], default: 'customer' },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  created_at: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
