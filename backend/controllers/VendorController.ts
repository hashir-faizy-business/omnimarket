import { Request, Response } from 'express';
import { Vendor } from '../models/Vendor.js';

export const getVendorInfo = async (req: Request, res: Response) => {
  try {
    const vendors = await Vendor.find().limit(10);
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vendor info' });
  }
};
