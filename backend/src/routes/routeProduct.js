// routeProduct.js
const express = require('express');
const productController = require('../controllers/ProductController');

const routeProduct = express.Router();

routeProduct.get('/', productController.getAllProducts);
routeProduct.get('/:id', productController.getProductById);

module.exports = routeProduct;
