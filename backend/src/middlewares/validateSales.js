const checkRequiredFields = require('../utils/checkRequired');

const validateSalesFields = (req, res, next) => {
  const { body } = req;
  const requiredProductFields = ['productId', 'quantity'];

  const errors = body.map((product) => checkRequiredFields(product, requiredProductFields))
                     .filter((error) => error);

  if (errors.length > 0) {
    return res.status(400).json({ message: errors[0] });
  }

  next();
};

module.exports = validateSalesFields;
