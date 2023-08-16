const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const salesService = require('../../../src/services/sales.service');
const validation = require('../../../src/middlewares/validationInputValue');
const {
  allSalesFromModel,
  saleFromModel,
  saleFromServiceNotFound,
} = require('../../mocks/sales.mock');

describe('Tests for the SALES SERVICE:', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Retrieving all sales successfully', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSalesFromModel);
    const findAllResponse = await salesService.findAll();

    expect(findAllResponse.status).to.equal('SUCCESSFUL');
    expect(findAllResponse.data).to.deep.equal(allSalesFromModel);
  });

  it('Retrieving sale by id successfully', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromModel);
    const inputData = 1;
    const findByIdResponse = await salesService.findById(inputData);

    expect(findByIdResponse.status).to.equal('SUCCESSFUL');
    expect(findByIdResponse.data).to.deep.equal(saleFromModel);
  });

  it('Fails to retrieve non-existing sale by id', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const inputData = 9999;
    const findByIdResponse = await salesService.findById(inputData);

    expect(findByIdResponse.status).to.equal('NOT_FOUND');
    expect(findByIdResponse.data).to.deep.equal(saleFromServiceNotFound.data);
  });

  it('Verifies product existence successfully', async function () {
    sinon.stub(productsModel, 'getProductById').resolves({}); 

    const verifyProductResponse = await salesService.verifyProductId([{ productId: 1 }]);
    console.log(verifyProductResponse);
    
    sinon.assert.calledOnce(productsModel.getProductById);
    sinon.assert.calledWith(productsModel.getProductById, 1); 
});

  it('Fails to verify product existence', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined); 

    const verifyProductResponse = await salesService.verifyProductId([{ productId: 1 }]);

    expect(verifyProductResponse.status).to.equal('NOT_FOUND');
    expect(verifyProductResponse.message).to.equal('Product not found');
  });

  it('Fails to create a new sale due to invalid sale data', async function () {
    const stubValidateNewSale = sinon.stub(validation, 'validateNewSale');
    stubValidateNewSale.returns({ status: 'INVALID_VALUE', message: 'Invalid sale data' });
  
    const createSaleResponse = await salesService.createSale([{ productId: 1, quantity: -1 }]);
  
    expect(createSaleResponse.status).to.equal('INVALID_VALUE');
    expect(createSaleResponse.data.message).to.equal('Invalid sale data');
  
    sinon.assert.calledOnce(stubValidateNewSale);
    sinon.assert.calledWith(stubValidateNewSale, [{ productId: 1, quantity: -1 }]);
  });
});
