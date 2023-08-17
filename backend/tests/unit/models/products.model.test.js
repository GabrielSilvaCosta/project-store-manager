const { expect } = require('chai');
const sinon = require('sinon');
const modelsDeProdutos = require('../../../src/models/products.model');
const conexao = require('../../../src/models/connection');
const {
  getAllProductsFromDB,
  getAllProductsFromModel,
  getProductByIdFromDB,
  getProductByIdFromModel,
} = require('../../mocks/products.mock');

describe('Testes unitários dos Modelos de Produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getAllProducts deve retornar um array com todos os produtos', async function () {
    sinon.stub(conexao, 'execute').resolves(getAllProductsFromDB);
    const produtos = await modelsDeProdutos.getAllProducts();
    expect(produtos).to.be.an('array');
    expect(produtos).to.have.lengthOf(3);
    expect(produtos).to.deep.equal(getAllProductsFromModel);
  });

  it('getProductById deve retornar um objeto com o produto', async function () {
    sinon.stub(conexao, 'execute').resolves(getProductByIdFromDB);
    const produto = await modelsDeProdutos.getProductById(1);
    expect(produto).to.be.an('object');
    expect(produto).to.deep.equal(getProductByIdFromModel);
  });

  it('createProduct deve inserir um novo produto e retornar o ID inserido', async function () {
    const newProduct = { name: 'New Product' };
    const insertId = 123;

    sinon.stub(conexao, 'execute').resolves([{ insertId }]);
    const result = await modelsDeProdutos.createProduct(newProduct);

    expect(result).to.equal(insertId);
  });

  it('updateProduct deve atualizar um produto e não retornar nenhum resultado', async function () {
    const updatedProduct = { name: 'Updated Product' };
    const productId = 1;

    sinon.stub(conexao, 'execute');
    await modelsDeProdutos.updateProduct(updatedProduct, productId);

    sinon.assert.calledWith(
      conexao.execute,
      'UPDATE products SET name = ? WHERE id = ?',
      ['Updated Product', 1],
    );
  });

  // it('deleteProduct deve excluir um produto e não retornar nenhum resultado', async function () {
  //   const productId = 1;

  //   sinon.stub(conexao, 'execute');
  //   await modelsDeProdutos.deleteProduct(productId);

  //   sinon.assert.calledWith(
  //     conexao.execute,
  //     'DELETE FROM products WHERE id = ?',
  //     [1],
  //   );
  // });
});
