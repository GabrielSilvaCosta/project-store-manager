const { expect } = require('chai');
// const sinon = require('sinon');
const { validateNewProduct, validateNewSale } = require('../../../src/middlewares/validationInputValue');
const { productValidationSchema } = require('../../../src/middlewares/schemas');
const { addSaleSchema } = require('../../../src/middlewares/schemasSales');

describe('Validation Functions', function () {
  describe('validateNewProduct', function () {
    it('should return error object for invalid product', function () {
      const invalidProduct = { name: 'Short', price: -5, category: 'Invalid' };
      const validationResult = validateNewProduct(invalidProduct);
      expect(validationResult).to.deep.equal({
        status: 'INVALID_VALUE',
        message: productValidationSchema.validate(invalidProduct).error.message,
      });
    });
  });

  describe('validateNewSale', function () {
    it('should return error object for invalid sales', function () {
      const invalidSales = [
        { productId: 1, quantity: 0 },
        { productId: 2, quantity: -1 },
      ];
      const validationResult = validateNewSale(invalidSales);
      expect(validationResult).to.deep.equal({
        status: 'INVALID_VALUE',
        message: addSaleSchema.validate(invalidSales[0]).error.message,
      });
    });
  }); 
});