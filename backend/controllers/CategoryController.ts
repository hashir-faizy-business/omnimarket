import { Request, Response } from 'express';
import { Category } from '../models/Category.js';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ active: true }).sort({ order: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
