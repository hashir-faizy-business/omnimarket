import { Router } from 'express';
import authRoutes from './auth.js';
import productRoutes from './products.js';
import vendorRoutes from './vendors.js';
import adminRoutes from './admin.js';
import orderRoutes from './orders.js';
import * as VendorController from '../controllers/VendorController.js';
import * as CategoryController from '../controllers/CategoryController.js';
import * as SectionController from '../controllers/SectionController.js';
import * as VideoController from '../controllers/VideoController.js';

const router = Router();

router.use((req, res, next) => {
  console.log(`[apiRouter] ${req.method} ${req.url}`);
  res.setHeader('X-API-Router', 'reached');
  next();
});

// Health check
router.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "Server is running with local JSON database",
    db: 1
  });
});

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/vendor', vendorRoutes);
router.use('/admin', adminRoutes);
router.use('/orders', orderRoutes);

router.get('/categories', CategoryController.getAllCategories);
router.get('/sections', SectionController.getAllSections);
router.get('/videos', VideoController.getAllVideos);

// Legacy support for vendor-info
router.get('/vendor-info', VendorController.getVendorInfo);

// API 404 Handler
router.use((req, res) => {
  res.status(404).json({ error: `API endpoint not found: ${req.method} ${req.originalUrl}` });
});

export default router;
