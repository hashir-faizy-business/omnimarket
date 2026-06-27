import { Request, Response } from 'express';
import { readCollection } from '../config/jsonDb.js';

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = readCollection<any>('videos');
    const sortedVideos = videos.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
    res.json(sortedVideos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};
