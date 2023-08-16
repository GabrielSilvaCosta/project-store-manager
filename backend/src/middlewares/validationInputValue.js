const { productValidationSchema } = require('./schemas');
const { addSaleSchema } = require('./schemasSales');

const validateNewProduct = (product) => {
  const { error } = productValidationSchema.validate(product);

  if (error) {
    return {
      status: 'INVALID_VALUE',
      message: error.message,
    };
  }

  return null;
};

const validateNewSale = (sales) => {
  const invalidSale = sales.reduce((invalid, sale) => {
    if (!invalid) {
      const { error } = addSaleSchema.validate(sale);
      if (error) {
        return {
          status: 'INVALID_VALUE',
          message: error.message,
        };
      }
    }
    return invalid;
  }, undefined);

  return invalidSale;
};

module.exports = {
  validateNewProduct,
  validateNewSale,
};
