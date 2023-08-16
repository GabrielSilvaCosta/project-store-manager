// ProductControler.js
const productsService = require('../services/products.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsService.getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

const createProduct = async (req, res) => {
  const { body } = req;
  const { status, data } = await productsService.createProduct(body);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};