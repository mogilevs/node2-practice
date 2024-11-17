import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from '../controllers/products.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductsSchema,
  updateProductsSchema,
} from '../validation/products.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/products', ctrlWrapper(getAllProductsController));
router.get(
  '/products/:productId',
  isValidId,
  ctrlWrapper(getProductByIdController),
);
router.post(
  '/products',
  validateBody(createProductsSchema),
  ctrlWrapper(createProductController),
);
router.patch(
  '/products/:productId',
  isValidId,
  validateBody(updateProductsSchema),
  ctrlWrapper(updateProductController),
);
router.delete(
  '/products/:productId',
  isValidId,
  ctrlWrapper(deleteProductController),
);

export default router;
