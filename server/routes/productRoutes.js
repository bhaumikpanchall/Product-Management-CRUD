import { Router } from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticate);
router.route('/').post(createProduct).get(getProducts);
router.route('/:id').put(updateProduct).delete(deleteProduct);

export default router;

