const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productService = require('../../../src/services/ProductService');
const productController = require('../../../src/controllers/ProductController');
// const productModel = require('../../../src/models/product.model');
// const connection = require('../../../src/configuration/connection');

describe('ProductController', function () {
  describe('getAllProducts', function () {
    it('deve buscar e retornar todos os produtos', async function () {
      const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      sinon.stub(productService, 'getAllProducts').resolves(mockProducts);
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productController.getAllProducts(req, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(mockProducts);

      productService.getAllProducts.restore();
    });

    it('deve lidar com erros', async function () {
      sinon.stub(productService, 'getAllProducts').throws(new Error('Database error'));
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productController.getAllProducts(req, res);

      expect(res.status).to.be.calledWith(500);
      expect(res.json).to.be.calledWith({ error: 'Error fetching products' });

      productService.getAllProducts.restore();
    });
  });

  describe('getProductById', function () {
    it('deve buscar e retornar um produto por ID', async function () {
      const mockProduct = { id: 1, name: 'Product 1' };
      sinon.stub(productService, 'getProductById').resolves(mockProduct);
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productController.getProductById(req, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(mockProduct);

      productService.getProductById.restore();
    });

    it('deve lidar com produto não encontrado', async function () {
      sinon.stub(productService, 'getProductById').resolves(null);
      const req = { params: { id: 99 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productController.getProductById(req, res);

      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: 'Product not found' });

      productService.getProductById.restore();
    });

    it('deve lidar com erros', async function () {
      sinon.stub(productService, 'getProductById').throws(new Error('Database error'));
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await productController.getProductById(req, res);

      expect(res.status).to.be.calledWith(500);
      expect(res.json).to.be.calledWith({ error: 'Error fetching product' });

      productService.getProductById.restore();
    });
  });
});
