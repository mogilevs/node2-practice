import { ProductsCollection } from '../db/models/product.js';

export const getProducts = async (filter) => {
  const productsQuery = ProductsCollection.find();
  if (filter.category) productsQuery.where('category').equals(filter.category);
  if (filter.minPrice) productsQuery.where('price').gte(filter.minPrice);
  if (filter.maxPrice) productsQuery.where('price').lte(filter.maxPrice);
  return productsQuery;
};

export const getProductById = async (productId) => {
  const product = await ProductsCollection.findOne({ _id: productId });
  return product;
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};

export const updateProduct = async (productId, payload) => {
  const rawResult = await ProductsCollection.findOneAndUpdate(
    { _id: productId },
    payload,
    {
      new: true,
    },
  );

  return rawResult;
};

export const deleteProduct = async (productId) => {
  const product = await ProductsCollection.findOneAndDelete({ _id: productId });
  return product;
};
