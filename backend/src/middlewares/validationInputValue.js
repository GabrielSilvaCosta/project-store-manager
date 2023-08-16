const { productValidationSchema } = require('./schemas');

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

module.exports = {
  validateNewProduct,
};
