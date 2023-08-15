const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, saleFromDB } = require('../../mocks/sales.mock');

describe('Sales Model Tests:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Retrieves all sales successfully', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesFromDB]);
    const retrievedSales = await salesModel.findAll();

    expect(retrievedSales).to.be.an('array');
    expect(retrievedSales).to.have.length(3);
    expect(retrievedSales).to.be.deep.equal(allSalesFromDB);
  });

  it('Retrieves a sale by id successfully', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);
    const inputSaleId = 1;
    const retrievedSale = await salesModel.findById(inputSaleId);

    expect(retrievedSale).to.be.an('array');
    expect(retrievedSale).to.have.length(2);
    expect(retrievedSale).to.be.deep.equal(saleFromDB);
  });
});
