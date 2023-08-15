// ProductService.js
const ProductModel = require('../models/products.model');

const getAllProducts = async () => ProductModel.getAllProducts();

const getProductById = async (id) => ProductModel.getProductById(id);

const createProduct = async (name) => ProductModel.createProduct(name);

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};