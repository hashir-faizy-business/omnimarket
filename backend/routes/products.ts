import { Router } from 'express';
import * as ProductController from '../controllers/ProductController.js';

const router = Router();

router.get('/', ProductController.getAllProducts);
router.get('/:slug', ProductController.getProductBySlug);

export default router;
