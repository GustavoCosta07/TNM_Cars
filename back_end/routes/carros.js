const express = require('express');
const carRouter = express.Router();
const buscarCarroIdeal = require('../controllers/Buscar_carro_ideal')
const autenticarUsuario = require('../middlewares/Autenticar_usuario')
const favoritarCarro = require('../controllers/Favoritar_carro')
const listarCarrosFavoritos = require('../controllers/Listar_carros_favoritos')

carRouter.post('/carro_ideal',autenticarUsuario, buscarCarroIdeal)
carRouter.post('/carro/favoritar',autenticarUsuario,favoritarCarro.favoritar)
carRouter.post('/carro/desfavoritar',autenticarUsuario,favoritarCarro.desfavoritar)
carRouter.get('/carro/favoritos',autenticarUsuario,listarCarrosFavoritos)


module.exports = carRouter;