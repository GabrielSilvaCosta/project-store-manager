const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const productsModel = require('../../../src/models/products.model');
const validation = require('../../../src/middlewares/validationInputValue');
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

  it('Should insert product successfully', async function () {
    const insertedProductId = 123;
    const inputData = { name: 'Product Name' };

    const stubValidation = sinon.stub(validation, 'validateNewProduct').returns(null);
    const stubCreateProduct = sinon.stub(productsModel, 'createProduct').resolves(insertedProductId);
    const stubGetProductById = sinon.stub(productsModel, 'getProductById').resolves(inputData);

    const responseService = await productsService.createProduct(inputData);

    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal(inputData);

    sinon.assert.calledOnce(stubValidation);
    sinon.assert.calledOnce(stubCreateProduct);
    sinon.assert.calledOnce(stubGetProductById);

    stubValidation.restore();
    stubCreateProduct.restore();
    stubGetProductById.restore();
  });

  it('Should handle error during product creation', async function () {
    const inputData = { name: 'Product Name' };

    const stubValidation = sinon.stub(validation, 'validateNewProduct').returns(null);
    const stubCreateProduct = sinon.stub(productsModel, 'createProduct').rejects(new Error('Database error'));

    const responseService = await productsService.createProduct(inputData);

    expect(responseService.status).to.equal('ERROR');
    expect(responseService.data.message).to.equal('An error occurred while creating the product');

    sinon.assert.calledOnce(stubValidation);
    sinon.assert.calledOnce(stubCreateProduct);

    stubValidation.restore();
    stubCreateProduct.restore();
  });
});
