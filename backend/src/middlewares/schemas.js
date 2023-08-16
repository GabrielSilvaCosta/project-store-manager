const Joi = require('joi');

const productValidationSchema = Joi.object({
  name: Joi.string().min(5),
});

module.exports = {
  productValidationSchema,
};
