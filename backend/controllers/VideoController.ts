import { Request, Response } from 'express';
import { Video } from '../models/Video.js';

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find().sort({ created_at: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};
