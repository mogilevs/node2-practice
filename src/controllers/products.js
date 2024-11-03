import createHttpError from 'http-errors';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  const products = await getProducts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const product = await getProductById(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const student = await createProduct(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a product!`,
    data: student,
  });
};

export const updateProductController = async (req, res) => {
  const { productId } = req.params;
  const result = await updateProduct(productId, req.body);

  if (!result) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a product!`,
    data: result,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params;
    const result = await deleteProduct(productId);

    if (!result) {
      throw createHttpError(404, 'Student not found');
    }

    res.status(204).send();
};
