// app.js
const express = require('express');
const routeProduct = require('./routes/routeProduct');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', routeProduct);

module.exports = app;
