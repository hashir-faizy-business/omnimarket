import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => res.json({ message: 'Vendors route' }));
export default router;
