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

const updateProduct = async (product, id) => {
  const { name } = product;
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  return connection.execute(query, [name, id]);
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  try {
    const [result] = await connection.execute(query, [id]);
    return result;
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return null; 
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};