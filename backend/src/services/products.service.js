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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
