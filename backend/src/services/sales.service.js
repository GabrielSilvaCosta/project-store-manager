const { salesModel, productsModel } = require('../models');
const validation = require('../middlewares/validationInputValue');

const handleResponse = (status, data) => ({ status, data });

const findAll = async () => {
  const sales = await salesModel.findAll();
  return handleResponse('SUCCESSFUL', sales);
};

const findById = async (salesId) => {
  const sale = await salesModel.findById(salesId);

  if (sale.length === 0) {
    return handleResponse('NOT_FOUND', { message: 'Sale not found' });
  }

  return handleResponse('SUCCESSFUL', sale);
};

const verifyProduct = async (sales) => {
  if ((await Promise.all(sales.map(({ productId }) => productsModel.getProductById(productId))))
      .some((result) => result === undefined)) {
 return { status: 'NOT_FOUND',
message:
     'Product not found' }; 
}
};

const createSale = async (sales) => {
  const errorSchema = validation.validateNewSale(sales);
  if (errorSchema) return { status: errorSchema.status, data: { message: errorSchema.message } };
  
  const errorProductId = await verifyProduct(sales);
  if (errorProductId) {
 return { status: errorProductId.status,
data: 
    { message: errorProductId.message } }; 
}
  
  const insertId = await salesModel.insert(sales);
  const itemsSold = (await salesModel.findById(insertId))
  .map(({ productId, quantity }) => ({ productId, quantity }));
  
  return { status: 'CREATED', data: { id: insertId, itemsSold } };
};

module.exports = {
  findAll,
  findById,
  createSale,
  verifyProductId: verifyProduct,
};
