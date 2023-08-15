// ProductService.js
const ProductModel = require('../models/products.model');

const getAllProducts = async () => ProductModel.getAllProducts();

const getProductById = async (id) => ProductModel.getProductById(id);

module.exports = {
  getAllProducts,
  getProductById,
};