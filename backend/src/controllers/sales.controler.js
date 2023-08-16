const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const handleResponse = (res, result) => {
  const { status, data } = result;
  return res.status(mapStatusHTTP(status)).json(data);
};

const findAll = async (req, res) => {
  const result = await salesService.findAll();
  return handleResponse(res, result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.findById(id);
  return handleResponse(res, result);
};

const createSale = async (req, res) => {
  const { body } = req;
  const result = await salesService.createSale(body);
  return handleResponse(res, result);
};

module.exports = {
  findAll,
  findById,
  createSale,
};
