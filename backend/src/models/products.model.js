// productModel.js
const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product;
};

const createProduct = async (product) => {
  const { name } = product;
  const query = 'INSERT INTO products (name) VALUES (?);';
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};