const sinon = require('sinon');
const productsController = require('../../../src/controllers/products.controller');
const productsModels = require('../../../src/models/products.model');
const {

  getAllProductsFromModel,
  
} = require('../../mocks/products.mock');

describe('Products Controller unit tests', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve lidar com erros ao buscar produtos', async function () {
    const getAllProductsStub = sinon.stub(productsModels, 'getAllProducts');
    getAllProductsStub.throws(new Error('Database error'));

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts({}, res);

    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.json, { error: 'Error fetching products' });

    getAllProductsStub.restore();
  });

  it('deve buscar e retornar todos os produtos', async function () {
    const getAllProductsStub = sinon.stub(productsModels, 'getAllProducts');
    getAllProductsStub.resolves(getAllProductsFromModel);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts({}, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, getAllProductsFromModel);

    getAllProductsStub.restore();
  });

  it('deve buscar e retornar um produto pelo ID', async function () {
    const getProductByIdStub = sinon.stub(productsModels, 'getProductById');
    const expectedProduct = { id: 1, name: 'Product 1' };
    getProductByIdStub.withArgs(1).resolves(expectedProduct);

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, expectedProduct);

    getProductByIdStub.restore();
  });
});
