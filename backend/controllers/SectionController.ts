import { Request, Response } from 'express';
import { Section } from '../models/Section.js';

export const getAllSections = async (req: Request, res: Response) => {
  try {
    const sections = await Section.find({ active: true }).sort({ order: 1 });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sections' });
  }
};
