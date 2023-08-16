const productsModel = require('../models/products.model');
const validation = require('../middlewares/validationInputValue');

const getAllProducts = async () => productsModel.getAllProducts();

const getProductById = async (id) => productsModel.getProductById(id);

const createProduct = async (productId) => {
  const error = validation.validateNewProduct(productId);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  try {
    const insertId = await productsModel.createProduct(productId);
    const newProduct = await productsModel.getProductById(insertId);

    return { status: 'CREATED', data: newProduct };
  } catch (err) {
    return { status: 'ERROR', data: { message: 'An error occurred while creating the product' } };
  }
};

const updateProduct = async (product, id) => {
  const error = validation.validateNewProduct(product);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const oldProduct = await productsModel.getProductById(id);
  if (!oldProduct) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  try {
    await productsModel.updateProduct(product, id);

    const updatedProduct = await productsModel.getProductById(id);
    return { status: 'SUCCESSFUL', data: updatedProduct };
  } catch (err) {
    return { status: 'ERROR', data: { message: 'An error occurred while updating the product' } };
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
