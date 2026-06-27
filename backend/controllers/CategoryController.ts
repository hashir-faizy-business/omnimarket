import { Request, Response } from 'express';
import { readCollection } from '../config/jsonDb.js';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = readCollection<any>('categories');
    const activeSortedCategories = categories
      .filter(cat => cat.active === true)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json(activeSortedCategories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
