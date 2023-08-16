const { salesModel } = require('../models');

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

const createSale = async (saleData) => {
  const saleId = await salesModel.insert(saleData);
  const itemsSold = saleData.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));
  return handleResponse('CREATED', { id: saleId, itemsSold });
};

module.exports = {
  findAll,
  findById,
  createSale,
};
