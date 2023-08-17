const sinon = require('sinon');
const productsController = require('../../../src/controllers/products.controller');
const productsModels = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
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

  it('deve lidar com erros ao atualizar um produto', async function () {
    const updateProductStub = sinon.stub(productsService, 'updateProduct');
    updateProductStub.throws(new Error('Database error'));
  
    const req = { params: { id: 1 }, body: { name: 'New Name' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsController.updateProduct(req, res);
  
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.json, { error: 'An error occurred while updating the product' });
  
    updateProductStub.restore();
  });

  it('deve atualizar um produto com sucesso', async function () {
    const updateProductStub = sinon.stub(productsService, 'updateProduct');
    const updatedProduct = { id: 1, name: 'Updated Product' };
    updateProductStub.withArgs({ name: 'New Name' }, 1).resolves({ status: 'SUCCESSFUL', data: updatedProduct });
  
    const req = { params: { id: 1 }, body: { name: 'New Name' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsController.updateProduct(req, res);
  
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, updatedProduct);
  
    updateProductStub.restore();
  });

  it('deve retornar status 404 ao buscar um produto inexistente por ID', async function () {
    const getProductByIdStub = sinon.stub(productsModels, 'getProductById');
    getProductByIdStub.withArgs(999).resolves(null);
  
    const req = { params: { id: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsController.getProductById(req, res);
  
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.json, { message: 'Product not found' });
  
    getProductByIdStub.restore();
  });
  
  it('deve excluir um produto com sucesso', async function () {
    const deleteProductStub = sinon.stub(productsService, 'deleteProduct');
    deleteProductStub.withArgs(1).resolves({ status: 'DELETED', data: {} });
  
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsController.deleteProduct(req, res);
  
    sinon.assert.calledWith(res.status, 204);
    sinon.assert.calledWith(res.json, {});
  
    deleteProductStub.restore();
  });
});
