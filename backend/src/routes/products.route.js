const express = require('express');
const productController = require('../controllers/products.controller');
const validateProductFields = require('../middlewares/validateProducts');

const routeProduct = express.Router();

routeProduct.get('/', productController.getAllProducts);
routeProduct.get('/:id', productController.getProductById);
routeProduct.post('/', validateProductFields, productController.createProduct);
routeProduct.put('/:id', validateProductFields, productController.updateProduct);
routeProduct.delete('/:id', productController.deleteProduct);

module.exports = routeProduct;
