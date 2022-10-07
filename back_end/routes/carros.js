const express = require('express');
const carRouter = express.Router();
const buscarCarroIdeal = require('../controllers/Buscar_carro_ideal')

carRouter.post('/carro_ideal', buscarCarroIdeal)

module.exports = carRouter;