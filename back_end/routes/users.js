const express = require('express');
const usersRouter = express.Router();
const cadastrarUsuario = require('../controllers/Cadastrar_usuario')

usersRouter.post('/users', cadastrarUsuario)

module.exports = usersRouter;