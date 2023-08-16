const Joi = require('joi');

const addSale = Joi.object({
    quantity: Joi.number().min(1),
    productId: Joi.number().integer(),
  });

  module.exports = {
    addSaleSchema: addSale,
  };