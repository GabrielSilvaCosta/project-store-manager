const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
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
});
