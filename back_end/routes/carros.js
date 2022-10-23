const express = require('express');
const carRouter = express.Router();
const buscarCarroIdeal = require('../controllers/Buscar_carro_ideal')
const autenticarUsuario = require('../middlewares/Autenticar_usuario')

carRouter.post('/carro_ideal',autenticarUsuario, buscarCarroIdeal)



module.exports = carRouter;