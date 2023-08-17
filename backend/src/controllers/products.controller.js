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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const { status, data } = await productsService.updateProduct(body, id);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productsService.deleteProduct(id);

    const { status, data } = response;
    const statusCode = mapStatusHTTP(status);

    return res.status(statusCode).json(data);
  } catch (error) {
    return res.status(500).end();
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};