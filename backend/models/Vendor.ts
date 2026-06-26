import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  business_name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'active', 'suspended'], default: 'pending' },
  created_at: { type: Date, default: Date.now }
});

export const Vendor = mongoose.model('Vendor', vendorSchema);
