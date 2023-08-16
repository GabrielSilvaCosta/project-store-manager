const connection = require('./connection');

const convertToCamelCase = (input) => 
input.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());

const findAll = async () => {
  const [sales] = await connection.execute(`SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
  FROM sales s 
  INNER JOIN sales_products sp 
  ON s.id = sp.sale_id
  ORDER BY sale_id, product_id;`);

  const camelCaseSales = sales.map((sale) => {
    const camelCaseSale = {};
    Object.keys(sale).forEach((key) => {
      camelCaseSale[convertToCamelCase(key)] = sale[key];
    });
    return camelCaseSale;
  });

  return camelCaseSales;
};

const findById = async (salesId) => {
  const [sales] = await connection.execute(`SELECT s.date, sp.product_id, sp.quantity 
  FROM sales s 
  INNER JOIN sales_products sp 
  ON s.id = sp.sale_id
  WHERE sp.sale_id = ? 
  ORDER BY sale_id, product_id;`, [salesId]);

  const camelCaseSales = sales.map((sale) => {
    const camelCaseSale = {};
    Object.keys(sale).forEach((key) => {
      camelCaseSale[convertToCamelCase(key)] = sale[key];
    });
    return camelCaseSale;
  });

  return camelCaseSales;
};

const saveSales = async (sales, salesId) => {
  const insertPromises = sales.map(({ productId, quantity }) =>
    connection
    .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', [
      salesId, productId, quantity]));

  await Promise.all(insertPromises);
};

const insert = async (sales) => {
  const data = new Date();
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (?)', [data]);

  await saveSales(sales, insertId);

  return insertId;
};

module.exports = {
  insert,
};

module.exports = {
  findAll,
  findById,
  insert,
};
