import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  views: { type: String },
  type: { type: String },
  url: { type: String },
  created_at: { type: Date, default: Date.now }
});

export const Video = mongoose.model('Video', videoSchema);
