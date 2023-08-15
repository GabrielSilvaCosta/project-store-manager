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

module.exports = {
  findAll,
  findById,
};
