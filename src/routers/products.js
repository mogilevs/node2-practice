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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getAllProductsController));
router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));
router.post(
  '/',
  validateBody(createProductsSchema),
  ctrlWrapper(createProductController),
);
router.patch(
  '/:productId',
  isValidId,
  validateBody(updateProductsSchema),
  ctrlWrapper(updateProductController),
);
router.delete('/:productId', isValidId, ctrlWrapper(deleteProductController));

export default router;
