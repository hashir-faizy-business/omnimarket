import { Request, Response } from 'express';
import { readCollection } from '../config/jsonDb.js';

export const getVendorInfo = async (req: Request, res: Response) => {
  try {
    const vendors = readCollection<any>('vendors').slice(0, 10);
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vendor info' });
  }
};
