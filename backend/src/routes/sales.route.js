const route = require('express').Router();
const { salesController } = require('../controllers');
const validateSales = require('../middlewares/validateSales');

route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);
route.post('/', validateSales, salesController.createSale);

module.exports = route;