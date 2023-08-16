 const checkRequiredFields = require('../utils/checkRequired');

const validateProductFields = (req, res, next) => {
  const { body } = req;

  const missingFields = checkRequiredFields(body, ['name']);

  if (missingFields) {
    return res.status(400).json({ message: missingFields });
  }
  return next();
};

module.exports = validateProductFields;