// routeProduct.js
const express = require('express');
const productController = require('../controllers/products.controller');

const routeProduct = express.Router();

routeProduct.get('/', productController.getAllProducts);
routeProduct.get('/:id', productController.getProductById);
routeProduct.post('/', productController.createProduct); 

module.exports = routeProduct;