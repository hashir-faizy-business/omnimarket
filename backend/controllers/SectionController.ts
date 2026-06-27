import { Request, Response } from 'express';
import { readCollection } from '../config/jsonDb.js';

export const getAllSections = async (req: Request, res: Response) => {
  try {
    const sections = readCollection<any>('sections');
    const activeSortedSections = sections
      .filter(sec => sec.active === true)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    res.json(activeSortedSections);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sections' });
  }
};
