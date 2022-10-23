const express = require('express');
const usersRouter = express.Router();
const cadastrarUsuario = require('../controllers/Cadastrar_usuario')
const autenticarUsuario = require('../controllers/Autenticar_usuario')

usersRouter.post('/users', cadastrarUsuario)
usersRouter.post('/users/autenticar',autenticarUsuario) 
module.exports = usersRouter;