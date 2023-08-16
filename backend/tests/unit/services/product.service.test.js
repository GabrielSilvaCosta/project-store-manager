const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const checkRequiredFields = require('../../../src/utils/checkRequired');

describe('Product Creation', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Should not insert product if the "name" field is less than 5 characters', async function () {
    const inputData = { name: 'Ring' };
    const responseService = await productsService.createProduct(inputData);

    expect(responseService.status).to.equal('INVALID_VALUE');
    expect(responseService.data.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('Should check for missing required fields', function () {
    const receivedFields = {};
    const requiredFields = ['name', 'price', 'category'];
    const missingFieldsMessage = checkRequiredFields(receivedFields, requiredFields);

    expect(missingFieldsMessage).to.equal('"name" is required, "price" is required, "category" is required');
  });
});
